import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { Documento } from '../acervo/model/interfaces/documento.interface';
import { Tag } from '../acervo/model/interfaces/tag.interface';
import { ProcessoService } from '../services/processo.service';
import { JulgamentoService } from '../services/julgamento.service';

@Component({
  selector: 'app-sessoes-julgamentos',
  templateUrl: './sessoes-julgamentos.component.html',
  styleUrls: ['./sessoes-julgamentos.component.scss']
})
export class SessoesJulgamentosComponent implements OnInit {

  processos: Processo[];
  sessao: SessaoJulgamento;
  tags: string[];
  documentos: string[];

  eventsSubject: Subject<any> = new Subject<any>();

  constructor(
    private _processoService: ProcessoService,
    private _julgamentoService: JulgamentoService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
      this.processos = [];
      this.sessao = {} as SessaoJulgamento;

      const numeroAno = this._route.snapshot.params['numero-ano'] as string;

      const [numero, ano] = numeroAno.split('-').map( Number );

      this._processoService.listarProcessos().subscribe({
        next: (data) => {
            this.processos = data.map((processo) => {
                this._processoService.obterDocumentosDoProcesso(processo.id).subscribe((documentos) => {
                    this.documentos = documentos.map(documento => documento.nome);

                    const documentosTransformados = this.documentos as unknown[];

                    processo.documentos = documentosTransformados as Documento[];
                });

                this.tags = processo.lista.map(tag => tag.descricao);

                const tagsTransformadas = this.tags as unknown[];

                processo.lista = tagsTransformadas as Tag[];

                return processo;
            });
        }
      });
      this._julgamentoService.listarSessoesDeJulgamento(numero, ano).subscribe({
        next: (data) => {
            this.sessao = data;
        }
      });
  }
}
