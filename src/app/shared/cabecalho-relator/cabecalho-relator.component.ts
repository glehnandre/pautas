import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FuseDrawerService } from '@fuse/components/drawer';
import { TipoDoProcesso } from 'app/modules/acervo/model/enums/tipoDoProcesso.enum';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { MinistroService } from 'app/modules/services/ministro.service';
import { ProcessoService } from 'app/modules/services/processo.service';

@Component({
  selector: 'app-cabecalho-relator',
  templateUrl: './cabecalho-relator.component.html',
  styleUrls: ['./cabecalho-relator.component.scss']
})
export class CabecalhoRelatorComponent implements OnInit {

  @Input() processo: string;
  @Input() colegiado: string;
  @Input() sessao: string;
  @Input() data_fim: string;

  panelOpenState = false;
  link: SafeResourceUrl;
  tags: string[] = [];
  relator: Ministro;
  tipo: TipoDoProcesso;
  documentos: {
    nomes: string[];
    links: string[];
  }

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

  public obterTipoDoProcesso(): string {
    return TipoDoProcesso[this.tipo];
  }

  abrirLink(link: string): void {
    if (link !== this.link) {
      this.link = this._sanitizer.bypassSecurityTrustResourceUrl(link);
    }
  }

  private _buscarProcessos(): void {
    this._processoService
      .listarProcessos(new HttpParams().set('processos', this.processo)).subscribe({
        next: ([processo]) => {
          const { id, lista, tipo } = processo;

          this.tipo = tipo;

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
