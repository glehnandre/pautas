import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultadoJulgamentoService } from '../services/resultado-julgamento.service';
import { Ata } from '../acervo/model/interfaces/ata.interface';
import { MatDialog } from '@angular/material/dialog';
import { PublicarFormComponent } from './publicar-form/publicar-form.component';
import { CorrecaoCapituloFormComponent } from './correcao-capitulo-form/correcao-capitulo-form.component';

interface Parametros {
    numero: number;
    ano: number;
}

@Component({
  selector: 'app-revisar-extrato-ata',
  templateUrl: './revisar-extrato-ata.component.html',
  styleUrls: ['./revisar-extrato-ata.component.scss']
})
export class RevisarExtratoAtaComponent implements OnInit {

  parametros: Parametros;

  ata: Ata;
  form: any;
  tags: string[];

  constructor(
      private _resultadoJulgamento: ResultadoJulgamentoService,
      private _matDialog: MatDialog,
      private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.parametros = this._route.snapshot.queryParams as Parametros;

    this._resultadoJulgamento
      .getAta(this.parametros.numero, this.parametros.ano)
      .subscribe({
        next: (ata) => {
          this.ata = ata;
          console.log(this.ata);
          this.tags = [ ata.sessao.tipo, ata.sessao.modalidade ];
        }
      });
  }

  /**
   * Abre o Formulário para Publicar Extrato
  **/
  publicar(): void {
    const dialogRef = this._matDialog
      .open(PublicarFormComponent, {
        data: this.ata.sessao,
        maxWidth: '100vw'
    });

    dialogRef.afterClosed().subscribe({
      next: (form) => {
        this.form = form;
        console.log(form);
      }
    });
  }

  corrigir(): void {
    const dialogRef = this._matDialog
      .open(CorrecaoCapituloFormComponent, {
        data: this.ata.capitulos_para_publicacao,
      });

    dialogRef.afterClosed().subscribe({
      next: () => {}
    })
  }
}
