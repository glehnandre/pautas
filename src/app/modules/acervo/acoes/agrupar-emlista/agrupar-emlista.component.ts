import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseAlertService } from '@fuse/components/alert';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tag } from '../../model/interfaces/tag.interface';
import { GerenciarListasComponent } from './gerenciar-listas/gerenciar-listas.component';
import { NovaListaComponent } from './nova-lista/nova-lista.component';

@Component({
  selector: 'app-agrupar-emlista',
  templateUrl: './agrupar-emlista.component.html',
  styleUrls: ['./agrupar-emlista.component.scss']
})
export class AgruparEmlistaComponent implements OnInit {
  public confirmMessage: string;
  public sucesso: boolean = false;
  public tags: Array<Tag> = [];

  /**
   * Constructor
   *
   * @param {MatDialogRef<AgruparEmlistaComponent>} dialogRef
   */
  constructor(
    private _httpClient: HttpClient,
    private _fuseAlertService: FuseAlertService,
    public dialogRef: MatDialogRef<AgruparEmlistaComponent>,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.carregaTodasAsTags();
  }

  abrirModalDeNovaTag(): void {
    const dialogRef = this.dialog.open(NovaListaComponent, {});
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this._exibeAlertaSucesso();
        this.carregaTodasAsTags();
      }
    });
  }

  abrirModalDeGerenciarTag(): void {
    const dialogRef = this.dialog.open(GerenciarListasComponent, {
      width: '60%',
    });
    
    dialogRef.afterClosed().subscribe((data) => {
      if (data === 'ok') {
        this._exibeAlertaSucesso();
      }
    });
  }

  private _exibeAlertaSucesso(tempo: number = 5000): void {
    this._fuseAlertService.show('sucesso');

    setTimeout(() => {
      this._fuseAlertService.dismiss('sucesso');
    }, tempo);
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

