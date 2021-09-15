import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { Documento } from '../acervo/model/interfaces/documento.interface';
import { Tag } from '../acervo/model/interfaces/tag.interface';
import { ProcessoService } from '../services/processo.service';
import { JulgamentoService } from '../services/julgamento.service';
import { Impedimento } from '../acervo/model/interfaces/impedimento.interface';

@Component({
  selector: 'app-sessoes-julgamentos',
  templateUrl: './sessoes-julgamentos.component.html',
  styleUrls: ['./sessoes-julgamentos.component.scss']
})
export class SessoesJulgamentosComponent implements OnInit {

  impedimentos: Impedimento[][] = [];
  processos: Processo[] = [];
  sessao: SessaoJulgamento;
  tags: string[];
  documentos: string[];

  constructor(
    private _processoService: ProcessoService,
    private _julgamentoService: JulgamentoService,
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

                this._processoService.obterImpedimentosDoMinistro(processo.abreviacao, "DT").subscribe(impedimentos=>{
                  this.impedimentos.push(impedimentos);
                })

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

  eventsSubject: Subject<any> = new Subject<any>();

}
