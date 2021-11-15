import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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
  link: SafeResourceUrl;
  nomesDasSessoes: string[] = [];

  displayedColumns: string[] = ['autor', 'responsavel', 'comentarios', 'documento', 'data', 'situacao', 'arquivo'];
  dataSource = new DataSourceInteiroTeor([]);

  constructor(
    private _route: ActivatedRoute,
    private _inteiroTeorService: RevisarInteiroTeorService,
    private _processoService: ProcessoService,
    private _sanitize: DomSanitizer,
  ) { 
    this.link = this._sanitize.bypassSecurityTrustResourceUrl('');
  }

  ngOnInit(): void {
    this.idProcesso = +this._route.snapshot.queryParamMap.get('id');
    this.colegiado = this._route.snapshot.queryParamMap.get('colegiado');

    this._inteiroTeorService.obterInteiroTeorDoAcordao(this.idProcesso).subscribe({
      next: (revisoes) => {
        this.revisoes = revisoes;
        this.dataSource = new DataSourceInteiroTeor(this.revisoes.documentos);
        this.obterNomesDasSessoes();
        console.log(this.revisoes);
      }
    });

    this._processoService.obterDocumentosDoProcesso(this.idProcesso).subscribe({
      next: (documentos) => {
        this.documentosDoProcesso = documentos;
        console.log(this.documentosDoProcesso);
      }
    });
  }

  public abrirPdf(link: string): void {
    this.link = this._sanitize.bypassSecurityTrustResourceUrl(link);
  }

  public obterNomesDasSessoes(): void {
    const nomes: string[] = [];
    
    this.revisoes.sessoes.forEach(({tipo, numero, ano, data_fim}) => {
      let dadosDaSessao: string;
      let dataFim = new Date(data_fim);

      if (this._comparaDatas(new Date(), dataFim)) {
        dadosDaSessao = `Sessão ${tipo} ${numero}/${ano}`;
      } else {
        dadosDaSessao = `Sessão ${tipo} ${numero}/${ano} - Finalizada dia ${dataFim.toLocaleDateString()}`;
      }

      nomes.push(dadosDaSessao);
    });

    this.nomesDasSessoes = nomes;
  }

  private _comparaDatas(dataInicial: Date, dataFinal: Date): boolean {
    return dataFinal > dataInicial;
  }

}

export class DataSourceInteiroTeor extends DataSource<DocumentoInteiroTeor> {
  data: BehaviorSubject<DocumentoInteiroTeor[]>;

  constructor(
    private readonly ELEMENT_DATA: DocumentoInteiroTeor[],
  ) {
    super();
    this.data = new BehaviorSubject<DocumentoInteiroTeor[]>(this.ELEMENT_DATA);
  }

  public connect(): Observable<DocumentoInteiroTeor[]> {
    return this.data;
  }

  public disconnect() {
    this.data.unsubscribe();
  }
}
