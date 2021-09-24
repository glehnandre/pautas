import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { Documento } from '../acervo/model/interfaces/documento.interface';
import { Tag } from '../acervo/model/interfaces/tag.interface';
import { ProcessoService } from '../services/processo.service';
import { JulgamentoService } from '../services/julgamento.service';
import { Impedimento } from '../acervo/model/interfaces/impedimento.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FuseDrawerService } from '@fuse/components/drawer';
import { delay } from 'rxjs/operators'

@Component({
  selector: 'app-sessoes-julgamentos',
  templateUrl: './sessoes-julgamentos.component.html',
  styleUrls: ['./sessoes-julgamentos.component.scss']
})
export class SessoesJulgamentosComponent implements OnInit {

  impedimentos: Observable<Impedimento[]>[] = [];
  processos: Processo[] = [];
  sessao: SessaoJulgamento = {} as SessaoJulgamento;;
  tags: string[];
  documentos: string[];
  link: SafeResourceUrl;

  label: string;
  tipo: string[];
  tamanho: number=1;
  relacionamento: string;
  descricao: string;
  observacao: string;

  constructor(
    private _processoService: ProcessoService,
    private _julgamentoService: JulgamentoService,
    public sanitizer: DomSanitizer,
    private _fuseDrawerService: FuseDrawerService,
  ) { }

  ngOnInit(): void {
      this._processoService.listarProcessos().subscribe({
        next: (data) => {
            this.processos = data.map(processo => {
                this._processoService.obterDocumentosDoProcesso(processo.id).subscribe(documentos => {
                    this.documentos = documentos.map(documento => documento.nome);

                    var aux = this.documentos as unknown[];

                    processo.documentos = aux as Documento[];
                });

                let abreviacao: string;
                if(processo.nome=="Mérito"){
                  abreviacao = `${processo.classe}-100`;
                }
                else abreviacao = `${processo.classe}-${processo.abreviacao}`;
                this.impedimentos.push(this._processoService.obterImpedimentosDoMinistro(abreviacao, "DT"));
                
                this.tags = processo.lista.map(tag => tag.descricao);

                var aux = this.tags as unknown[];

                processo.lista = aux as Tag[];

                return processo;
            });
        }
      });
      this._julgamentoService.listarTodasAsSessoesDeJulgamento().subscribe({
        next: (data) => {
            this.sessao = data[0];
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

  eventsSubject: Subject<any> = new Subject<any>();

}
