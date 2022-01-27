import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TipoDoProcesso } from 'app/modules/acervo/model/enums/tipoDoProcesso.enum';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';
import { Voto } from 'app/modules/acervo/model/interfaces/voto.interface';
import { MinistroService } from 'app/modules/services/ministro.service';
import { ProcessoService } from 'app/modules/services/processo.service';

@Component({
  selector: 'app-cabecalho-relator',
  templateUrl: './cabecalho-relator.component.html',
  styleUrls: ['./cabecalho-relator.component.scss']
})
export class CabecalhoRelatorComponent implements AfterContentChecked, OnInit {

  @Input() processo: Processo;
  @Input() colegiado: string;
  @Input() votos: Voto[];
  @Input() sessao: SessaoJulgamento;
  @Input() nomesDasSessoes: string[];
  @Input() chips: string[] = [];

  right: number = 0;
  panelOpenState = false;
  link: SafeResourceUrl;
  nomePdf: string = '';
  tags: string[] = [];
  relator: Ministro;
  tipo: TipoDoProcesso;
  dadosProcesso: {
    classe: string;
    numero: number;
    nome: string;
  }
  documentos: {
    nomes: string[];
    links: string[];
  }
  hasArrow: boolean;

  constructor(
    private _processoService: ProcessoService,
    private _ministroService: MinistroService,
    private _sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.link = this._sanitizer.bypassSecurityTrustResourceUrl('');
    this.carregarDocumentosProcesso(this.processo);
    this.carregarTags(this.processo)
    this._buscarColegiados();
  }

  ngAfterContentChecked(){
    if(document.getElementById("cabecalho").getBoundingClientRect().width  * (3/5)-1 <= document.getElementById("div1").getBoundingClientRect().width)
    this.hasArrow = true;
    else this.hasArrow = false;
  }

  public obterDadosDoProcesso(): string {
    if(this.processo != null)
    return `${this.processo.classe} ${this.processo.numero} ${this.processo.nome}`;
  }

  public obterNomeDoPdf(nome): void {
    this.nomePdf = nome;
  }

  public abrirLink(link: string): void {
    if (link !== this.link) {
      this.link = this._sanitizer.bypassSecurityTrustResourceUrl(link);
    }
  }

  public obterChipRemovido(chip: string): void {
    console.log(chip);
  }

  private carregarDocumentosProcesso(processo: Processo){
    this._processoService.obterDocumentosDoProcesso(processo?.id).subscribe(data => {
      this.documentos = { nomes: [], links: [] };
      data.forEach(documento => {
        this.documentos.nomes.push(documento.nome);
        this.documentos.links.push(documento.url);
      });
    });
  }

  private carregarTags(processo: Processo){
    this.tags = [];
    this.processo?.lista.forEach(tag => {
      this.tags.push(tag.descricao);
    });
  }

  private _buscarColegiados(): void {
    this._ministroService.listarColegiados(this.colegiado).subscribe({
      next: (colegiados) => {
        colegiados.forEach(({composicao}) => {
          composicao.forEach(({ministro, relator}) => {
            if (relator) {
              this.relator = ministro;
            }
          });
        });
      }
    });
  }

}
