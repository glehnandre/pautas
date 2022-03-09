import { Component, OnInit, Output, ViewChild, ViewEncapsulation, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { FiltroDialogComponent } from './filtro-dialog.component';
import { Filtros } from './filtros';


@Component({
  selector: 'digital-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FiltroComponent implements OnInit {
  filtros: Filtros = { termo: '', classes: [], situacoes: [], tags: [], pleno: false, primeira_turma: false, segunda_turma: false };
  termo: string = '';
  private eventsSubscription: Subscription;

  @Input() tag: Observable<any>;
  constructor(private dialog: MatDialog) {
  }
  ngOnInit() {
    this.eventsSubscription = this.tag.subscribe(({ data }) => {
      if (typeof data === 'object') {
        if (this.filtros.tags.indexOf(data) === -1) {
          this.filtros.tags.push(data)
        }
      }
      else {
        if (this.filtros.situacoes.indexOf(data) === -1) {
          this.filtros.situacoes.push(data)
        }
      }
    }
    )
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
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


}
