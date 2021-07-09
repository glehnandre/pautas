import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GerenciarMarcadoresComponent } from './gerenciar-marcadores/gerenciar-marcadores.component';
import { NovaListaComponent } from './nova-lista/nova-lista.component';

export interface Tag {
  id: number;
  descricao?: string;
  publica?: boolean;
  checked?: boolean;
}

@Component({
  selector: 'app-agrupar-emlista',
  templateUrl: './agrupar-emlista.component.html',
  styleUrls: ['./agrupar-emlista.component.scss']
})
export class AgruparEmlistaComponent implements OnInit {
  public confirmMessage: string;

  public tags: Array<Tag> = [];

  /**
   * Constructor
   *
   * @param {MatDialogRef<AgruparEmlistaComponent>} dialogRef
   */
  constructor(
    private _httpClient: HttpClient,
    public dialogRef: MatDialogRef<AgruparEmlistaComponent>,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.carregaTodasAsTags();
  }

  abrirModalDeNovaTag(): void {
    const dialogRef = this.dialog.open(NovaListaComponent, {});
    
    dialogRef.afterClosed().subscribe(() => {
      this.carregaTodasAsTags();
    });
  }

  abrirModalDeGerenciarTag(): void {
    const dialogRef = this.dialog.open(GerenciarMarcadoresComponent, {
      width: '60%',
      maxHeight: '560px',
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  obterTagsSelecionadas(): Array<{id: number}> {
    const idsTagsSelecionadas: Array<{id: number}> = [];

    this.tags.forEach(tag => {
      if (tag.checked) {
        idsTagsSelecionadas.push({id: tag.id});
      }
    });

    return idsTagsSelecionadas;
  }

  carregaTodasAsTags(): void {
    this.recuperarTagsDaApi().subscribe({
      next: (data) => {
        this.tags = data;
        this.tags.map(tag => tag.checked = false);
      }
    });
  }

  recuperarTagsDaApi(): Observable<Tag[]> {
    return this._httpClient.get<Tag[]>('tags').pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

}

