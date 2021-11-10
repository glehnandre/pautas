import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentoInteiroTeor } from '../acervo/model/interfaces/documento-inteiro-teor.interface';
import { Documento } from '../acervo/model/interfaces/documento.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { Tag } from '../acervo/model/interfaces/tag.interface';
import { ProcessoService } from '../services/processo.service';
import { RevisarInteiroTeorService } from '../services/revisar-inteiro-teor.service';

export interface RevisaoInteiroTeor {
  id_processo: number;
  status: 'Aberto' | 'Em elaboração' | 'Apto a ser publicado' | 'Publicado' | 'Alterado' | 'Republicado';
  classe: string;
  numero: number;
  nome: string;
  tags: Array<Tag>;
  sessoes: Array<SessaoJulgamento>;
  documentos: Array<DocumentoInteiroTeor>;
}

@Component({
  selector: 'app-revisar-inteiro-teor',
  templateUrl: './revisar-inteiro-teor.component.html',
  styleUrls: ['./revisar-inteiro-teor.component.scss']
})
export class RevisarInteiroTeorComponent implements OnInit {

  idProcesso: number = 0;
  colegiado: string = '';
  processo: Processo;
  documentosDoProcesso: Documento[];
  revisoes: RevisaoInteiroTeor;

  constructor(
    private _route: ActivatedRoute,
    private _inteiroTeorService: RevisarInteiroTeorService,
    private _processoSerivce: ProcessoService,
  ) { }

  ngOnInit(): void {
    this.idProcesso = +this._route.snapshot.queryParamMap.get('id');
    this.colegiado = this._route.snapshot.queryParamMap.get('colegiado');

    this._inteiroTeorService.obterInteiroTeorDoAcordao(this.idProcesso).subscribe({
      next: (revisoes) => {
        this.revisoes = revisoes;
        console.log(this.revisoes);
      }
    });

    this._processoSerivce.obterDocumentosDoProcesso(this.idProcesso).subscribe({
      next: (documentos) => {
        this.documentosDoProcesso = documentos;
        console.log(this.documentosDoProcesso);
      }
    });
  }

}
