import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FuseDrawerService } from '@fuse/components/drawer';
import { PublicacaoDto } from 'app/modules/acervo/model/interfaces/publicacaoDto.interface';
import { Voto } from 'app/modules/acervo/model/interfaces/voto.interface';
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

  constructor(
    private _fuseDrawerService: FuseDrawerService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.link && this.link['changingThisBreaksApplicationSecurity'] !== '') {
        this.toggleDrawerOpen();
    }
  }

  public toggleDrawerOpen(): void {
    const drawer = this._fuseDrawerService.getComponent(this.nome);
    if (drawer) {
      drawer.toggle();
    }
  }
}
