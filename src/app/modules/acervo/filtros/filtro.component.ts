import { Component, OnInit, Output, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FiltroDialogComponent } from './filtro-dialog.component';
import { Filtros } from './filtros';
import { MatChipInputEvent } from '@angular/material/chips';


@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FiltroComponent implements OnInit {
  filtros: Filtros = { termo: '', classes: [], situacoes: [], tags: [], pleno: false, primeira_turma: false, segunda_turma: false };
  termo: string = '';

  constructor(private dialog: MatDialog) {
  }

  //Abrir dialog
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.panelClass;
    dialogConfig.data = {
      filtros: this.filtros
    };

    const dialogRef = this.dialog.open(FiltroDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.filtros = data;
      console.log("Filtros: ", this.filtros);
    });
  }

  //Remove a specfic filter from the Filtros interface
  removeFiltro(nome_campo: string, valor: string): void {
    this.filtros[nome_campo].splice(this.filtros[nome_campo].indexOf(valor), 1);
  }

  //Remove the filters os an boolean (checkbox for exemple) attribute in Filtros interface.
  removeFiltroBooleano(nome_filtro: string): void {
    this.filtros[nome_filtro] = false;
  }

   //Remove the filters of a single term
    removeFiltroTermo(): void {
      this.filtros['termo'] = '';
      this.termo = '';
  }

  ngOnInit(): void {

  }
}
