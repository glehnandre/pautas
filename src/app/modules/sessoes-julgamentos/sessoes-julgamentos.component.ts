import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { ProcessoService } from '../services/processo.service';
import { SessaoDeJulgamentoService } from '../services/sessao-de-julgamento.service';
import { FuseAlertService } from '@fuse/components/alert';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FuseDrawerService } from '@fuse/components/drawer';
import { AlertaService } from '../services/alerta.service';
import { catchError } from 'rxjs/operators';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';
import { Processo } from 'app/shared/model/interfaces/processo.interface';
import { Impedimento } from 'app/shared/model/interfaces/impedimento.interface';

@Component({
  selector: 'app-sessoes-julgamentos',
  templateUrl: './sessoes-julgamentos.component.html',
  styleUrls: ['./sessoes-julgamentos.component.scss']
})
export class SessoesJulgamentosComponent implements OnInit {

  impedimentos: Observable<Impedimento[]>[] = [];
  processos: Processo[] = [];
  sessao: SessaoDeJulgamento = {} as SessaoDeJulgamento;
  tags: string[];
  documentos: string[];
  link: SafeResourceUrl;

  label: string;
  tipo: string[];
  tamanho: number=1;
  relacionamento: string;
  descricao: string;
  observacao: string;

  eventsSubject: Subject<any> = new Subject<any>();

  errorMessage: String;

  constructor(
    private _processoService: ProcessoService,
    private _sessaoDeJulgamentoService: SessaoDeJulgamentoService,
    private _fuseAlertService: FuseAlertService,
    public sanitizer: DomSanitizer,
    private _fuseDrawerService: FuseDrawerService,
    private _route: ActivatedRoute,
    private _alertaService: AlertaService,
  ) { }

  ngOnInit(): void {
      const { numero, ano } = this._route.snapshot.queryParams;

      this._sessaoDeJulgamentoService.listarSessoesDeJulgamento(numero, ano).subscribe({
        next: (data) => {
            this.sessao = data;

            this._sessaoDeJulgamentoService.listarProcessosPautadosNasSessoes(numero, ano).subscribe({
                next: (processosData) => {
                    this.processos = processosData;
                    processosData.forEach((processo) => {
                      this._processoService.obterDocumentosDoProcesso(processo.id).subscribe({
                        next: (documentos) => {
                          this.documentos = documentos.map(documento => documento.nome);
                        },
                        error: (error) => {
                          console.log(error);
                          this.errorMessage = error.message
                          this._alertaService.exibirAlerta("Error");
                        }
                      });

                      this.impedimentos.push(this._processoService.obterImpedimentosDoMinistro(processo.id, "DT").pipe(
                        catchError(error => {
                          console.log(error);
                          this.errorMessage =  error.message;
                          this._alertaService.exibirAlerta("Error")
                          return EMPTY;
                        })
                      ));

                      this.tags = processo.lista.map(tag => tag.descricao);
                    });
                },
                error: (error) => {
                  console.log(error);
                  this.errorMessage = error.message
                  this._alertaService.exibirAlerta("Error");
                }
            });
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = error.message
          this._alertaService.exibirAlerta("Error");
        }
      });
  }

  /**
   *
   * @param drawerName nome do fuse-drawer do html que será aberto
   */
  toggleDrawerOpen(drawerName: string): void {
    const drawer = this._fuseDrawerService.getComponent(drawerName);
    drawer.toggle();
  }

  /**
   *
   * @param impedimento objeto impedimento que será aberto
   */
   abrirJanela(impedimento: Impedimento): void {
      const hasSuspeicao = (impedimento.tipo.indexOf("Suspeição")!=-1);
      this.label = (hasSuspeicao) ? "Possível motivo de suspeição" : "Possível motivo de impedimento";
      this.tipo = impedimento.tipo;
      this.tamanho = this.tipo.length;
      this.relacionamento = impedimento.relacionamento;
      this.descricao = impedimento.descricao;
      this.observacao = impedimento.observacao;
      this.toggleDrawerOpen('telaImpedimentos');
  }

  isSessaoInvalida(): void {
    this._fuseAlertService.show('alertBoxInvalidSession');

    setTimeout(() => {
      this._fuseAlertService.dismiss('alertBoxInvalidSession');
    }, 5000);
  }
}
