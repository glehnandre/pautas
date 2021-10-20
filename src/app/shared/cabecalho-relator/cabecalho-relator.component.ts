import { HttpParams } from '@angular/common/http';
import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FuseDrawerService } from '@fuse/components/drawer';
import { TipoDoProcesso } from 'app/modules/acervo/model/enums/tipoDoProcesso.enum';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { Voto } from 'app/modules/acervo/model/interfaces/voto.interface';
import { MinistroService } from 'app/modules/services/ministro.service';
import { ProcessoService } from 'app/modules/services/processo.service';

@Component({
  selector: 'app-cabecalho-relator',
  templateUrl: './cabecalho-relator.component.html',
  styleUrls: ['./cabecalho-relator.component.scss']
})
export class CabecalhoRelatorComponent implements AfterContentChecked, OnInit {

  @Input() processo: string;
  @Input() colegiado: string;
  @Input() votos: Voto[];

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
    this._buscarProcessos();
    this._buscarColegiados();
  }

  ngAfterContentChecked(){
    if(document.getElementById("cabecalho").getBoundingClientRect().width  * (3/5)-1 <= document.getElementById("div1").getBoundingClientRect().width)
    this.hasArrow = true;
    else this.hasArrow = false;
  }

  public obterDadosDoProcesso(): string {
    if(this.dadosProcesso)
    return `${this.dadosProcesso.classe} ${this.dadosProcesso.numero} ${this.dadosProcesso.nome}`;
    return "Aguarde..."
  }

  public obterNomeDoPdf(nome): void {
    this.nomePdf = nome;
  }

  abrirLink(link: string): void {
    if (link !== this.link) {
      this.link = this._sanitizer.bypassSecurityTrustResourceUrl(link);
    }
  }

  private _buscarProcessos(): void {
    this._processoService
      .listarProcessos(new HttpParams().set('processo', this.processo)).subscribe({
        next: ([processo]) => {
          
          const { id, lista, classe, numero, nome } = processo;

          this.dadosProcesso = {classe, numero, nome};

          this.tags = [];
          lista.forEach(tag => {
            this.tags.push(tag.descricao);
          });

          this._processoService.obterDocumentosDoProcesso(id).subscribe(data => {
            this.documentos = { nomes: [], links: [] };
            data.forEach(documento => {
              this.documentos.nomes.push(documento.nome);
              this.documentos.links.push(documento.url);
            });
          });
        }
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
