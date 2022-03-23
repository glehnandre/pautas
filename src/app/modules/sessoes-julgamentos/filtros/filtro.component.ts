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
  filtros: Filtros = { termo: '', relatoria: [], listas: [], temas: [], classes: []};
//   private eventsSubscription: Subscription;

  @Input() tag: Observable<any>;
  constructor(private dialog: MatDialog) {
  }
  ngOnInit() {
    // this.eventsSubscription = this.tag.subscribe(({ data }) => {
    //   if (typeof data === 'object') {
    //     if (this.filtros.tipos.indexOf(data) === -1) {
    //       this.filtros.tipos.push(data)
    //     }
    //   }
    //   else {
    //     if (this.filtros.categorias.indexOf(data) === -1) {
    //       this.filtros.categorias.push(data)
    //     }
    //   }
    // }
    // )
  }

//   ngOnDestroy() {
//     this.eventsSubscription.unsubscribe();
//   }

  //Abrir dialog
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.panelClass;
    dialogConfig.data = {
      filtros: this.filtros.termo
    };

    const dialogRef = this.dialog.open(FiltroDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.filtros = data;
    });
  }

  //Remove a specfic filter from the Filtros interface
  removeFiltro(nome_campo: string, valor: string): void {
    this.filtros[nome_campo].splice(this.filtros[nome_campo].indexOf(valor), 1);
    this.filtros["filtros"].splice(this.filtros["filtros"].indexOf(valor), 1);
  }
}
