import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { SessaoDeJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { ProcessoService } from '../services/processo.service';
import { SessaoDeJulgamentoService } from '../services/sessao-de-julgamento.service';
import { FuseAlertService } from '@fuse/components/alert';
import { Impedimento } from '../acervo/model/interfaces/impedimento.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FuseDrawerService } from '@fuse/components/drawer';

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

  constructor(
    private _processoService: ProcessoService,
    private _sessaoDeJulgamentoService: SessaoDeJulgamentoService,
    private _fuseAlertService: FuseAlertService,
    public sanitizer: DomSanitizer,
    private _fuseDrawerService: FuseDrawerService,
    private _route: ActivatedRoute,
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
                      this._processoService.obterDocumentosDoProcesso(processo.id).subscribe((documentos) => {
                        this.documentos = documentos.map(documento => documento.nome);
                      });

                      this.impedimentos.push(this._processoService.obterImpedimentosDoMinistro(processo.id, "DT"));

                      this.tags = processo.lista.map(tag => tag.descricao);
                    });
                },
            });
        },
        error: () => {
            this.isSessaoInvalida();
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
