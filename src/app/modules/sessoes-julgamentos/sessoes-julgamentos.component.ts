import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { Documento } from '../acervo/model/interfaces/documento.interface';
import { Tag } from '../acervo/model/interfaces/tag.interface';
import { ProcessoService } from '../services/processo.service';

@Component({
  selector: 'app-sessoes-julgamentos',
  templateUrl: './sessoes-julgamentos.component.html',
  styleUrls: ['./sessoes-julgamentos.component.scss']
})
export class SessoesJulgamentosComponent implements OnInit {

  processos: Processo[];
  tags: string[];
  documentos: string[];

  constructor(
    private _processoService: ProcessoService,
  ) { }

  ngOnInit(): void {
      this.processos = [];
      this._processoService.listarProcessos().subscribe({
        next: (data) => {
            this.processos = data.map(processo => {
                this._processoService.obterDocumentosDoProcesso(processo.id).subscribe(documentos => {
                    this.documentos = documentos.map(documento => documento.nome);

                    var aux = this.documentos as unknown[];

                    processo.documentos = aux as Documento[];
                });

                this.tags = processo.lista.map(tag => tag.descricao);

                var aux = this.tags as unknown[];

                processo.lista = aux as Tag[];

                return processo;
            });
            console.table(this.processos);
        }
      });
  }

  eventsSubject: Subject<any> = new Subject<any>();

}
