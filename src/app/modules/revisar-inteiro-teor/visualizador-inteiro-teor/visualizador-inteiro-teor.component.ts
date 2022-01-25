import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FuseDrawerService } from '@fuse/components/drawer';
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

  public toggleDrawerOpen(): void {
    const drawer = this._fuseDrawerService.getComponent(this.nome);
    if (drawer) {
      drawer.toggle();
    }
  }
}