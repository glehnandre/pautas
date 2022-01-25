import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FuseDrawerService } from '@fuse/components/drawer';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { PublicacaoDto } from 'app/modules/acervo/model/interfaces/publicacaoDto.interface';
import { ConteudoPublicacaoComponent } from '../conteudo-publicacao/conteudo-publicacao.component';
import { RevisaoInteiroTeor } from '../revisar-inteiro-teor.component';

@Component({
  selector: 'app-visualizador-inteiro-teor',
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
