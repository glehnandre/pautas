import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FuseDrawerService } from '@fuse/components/drawer';
import { Processo } from 'app/shared/model/interfaces/processo.interface';
import { PublicacaoDto } from 'app/shared/model/interfaces/publicacaoDto.interface';
import { ConteudoPublicacaoComponent } from '../conteudo-publicacao/conteudo-publicacao.component';
import { RevisaoInteiroTeor } from '../revisar-inteiro-teor.component';


@Component({
  selector: 'digital-visualizador-inteiro-teor',
  templateUrl: './visualizador-inteiro-teor.component.html',
  styleUrls: ['./visualizador-inteiro-teor.component.scss']
})
export class VisualizadorInteiroTeorComponent implements OnInit, OnChanges {

  @Input() nome: string;
  @Input() publicacao: PublicacaoDto;
  @Input() link: SafeResourceUrl;
  @Input() posicao: string = 'left' || 'right';
  @Input() conteudo: PublicacaoDto;

  @Input() revisao: RevisaoInteiroTeor;
  @Input() processo: Processo;

  @ViewChild('publicacao') _conteudoPublicacao: ConteudoPublicacaoComponent;

  constructor(
    private _fuseDrawerService: FuseDrawerService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.link && this.link['changingThisBreaksApplicationSecurity'] !== '') {
        this.toggleDrawerOpen();
    }

    this._conteudoPublicacao?.atualizarRevisao(this.revisao);
  }

  public abrirEmNovaAba(): void {
    var newWindow = window.open();

    const documentos = this.revisao.documentos;

    documentos.forEach(documento => {
        if (documento.documento.status !== "Removido") {
            newWindow.document.write(
                `<div id="${documento.id}" style="width: 100%;text-align: center;font-weight: 600;font-size: 1.25rem;line-height: 1.75rem;margin-bottom: 1rem;margin-top: 3rem;">
                    ${documento.documento.nome}
                 </div>`
            );
            newWindow.document.write(documento.documento.textoSemFormatacao);
            newWindow.document.write("<hr></hr>");
        }
    })
  }

  public toggleDrawerOpen(): void {
    const drawer = this._fuseDrawerService.getComponent(this.nome);
    if (drawer) {
      drawer.toggle();
    }
  }
}
