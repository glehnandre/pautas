import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FuseDrawerService } from '@fuse/components/drawer';

@Component({
  selector: 'app-visualizador-pdf',
  templateUrl: './visualizador-pdf.component.html',
  styleUrls: ['./visualizador-pdf.component.scss']
})
export class VisualizadorPdfComponent implements OnInit, OnChanges {

  @Input() nome: string;
  @Input() link: DomSanitizer;

  constructor(
    private _fuseDrawerService: FuseDrawerService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.link) {
      this.toggleDrawerOpen();
    }
  }

  /**
  * Abre o menu que exibe o pdf
  *
  */
  public toggleDrawerOpen(): void {
    const drawer = this._fuseDrawerService.getComponent(this.nome);
    if (drawer) {
      drawer.toggle();
    }
  }

  public abrirNovaAba(): void {
    window.open(this.link['changingThisBreaksApplicationSecurity'], "_blank");
  }

}
