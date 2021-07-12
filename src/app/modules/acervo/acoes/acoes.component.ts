import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgruparEmlistaComponent } from './agrupar-emlista/agrupar-emlista.component';
import { PautarComponent } from './pautar/pautar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.scss']
})
export class AcoesComponent implements OnInit {

  mobile: boolean;
  @Output() Allselected = new EventEmitter();
  @Output() colecaoIdsDasTags = new EventEmitter<Array<{id: number}>>();
 
  constructor(private _matDialog: MatDialog, private _snackBar: MatSnackBar) {
    if (document.body.clientWidth <= 800) {
      this.mobile = true
    }
    else {
      this.mobile = false
    }
  }


  ngOnInit(): void {
  }

  selectAll(completed) {
    this.Allselected.emit(completed)

  }
  onResize() {
    if (document.body.clientWidth <= 800) {
      this.mobile = true
    }
    else {
      this.mobile = false
    }
  }

  abrirModalAgruparTags() {
    const dialogRef = this._matDialog.open(AgruparEmlistaComponent, {
      maxHeight: '560px',
    });

    dialogRef.afterClosed().subscribe((tags: Array<{id :number}>) => {
      this.colecaoIdsDasTags.emit(tags);
    });
  }

  openComposeDialog(): void {
    // Open the dialog
    const dialogRef = this._matDialog.open(PautarComponent);

    dialogRef.afterClosed()
      .subscribe((result) => {
        console.log('Compose dialog was closed!');
      });
  }

  openSnackBar() {
    this._snackBar.open("Selecione um ou mais processos", null, {
      duration:3000,
    });
  }
}
