import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertaService } from 'app/modules/services/alerta.service';
import { MinistroService } from 'app/modules/services/ministro.service';
import { ProcessoService } from 'app/modules/services/processo.service';
import { TipoDoProcesso } from 'app/shared/model/enums/tipoDoProcesso.enum';
import { Ministro } from '../model/interfaces/ministro.interface';
import { Processo } from '../model/interfaces/processo.interface';
import { SessaoDeJulgamento } from '../model/interfaces/sessao-julgamento.interface';
import { Voto } from '../model/interfaces/voto.interface';


@Component({
  selector: 'app-cabecalho-relator',
  templateUrl: './cabecalho-relator.component.html',
  styleUrls: ['./cabecalho-relator.component.scss']
})
export class CabecalhoRelatorComponent implements AfterContentChecked, OnInit {

  @Input() processo: Processo;
  @Input() colegiado: string;
  @Input() votos: Voto[];
  @Input() sessao: SessaoDeJulgamento;
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

  errorMessage: string;

  constructor(
    private _processoService: ProcessoService,
    private _ministroService: MinistroService,
    private _sanitizer: DomSanitizer,
    private _alertaService: AlertaService,
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
    return `${this.processo.classe} ${this.processo.numero} ${this.processo.cadeia}`;
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
    
  }

  private carregarDocumentosProcesso(processo: Processo){
    this._processoService.obterDocumentosDoProcesso(processo?.id).subscribe({
      next: (data) => {
        this.documentos = { nomes: [], links: [] };
        data.forEach(documento => {
          this.documentos.nomes.push(documento.nome);
          this.documentos.links.push(documento.url);
        });
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.message
        this._alertaService.exibirAlerta("Error");
      }
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
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.message
        this._alertaService.exibirAlerta("Error");
      }
    });
  }

}
