import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tag } from '../agrupar-emlista.component';

@Component({
  selector: 'app-nova-lista',
  templateUrl: './nova-lista.component.html',
  styleUrls: ['./nova-lista.component.scss']
})
export class NovaListaComponent implements OnInit {
  tag: Tag = {
    id: 0,
    descricao: '',
    publica: false,
    checked: false,
  };
  /**
   * Constructor
   *
   * @param {MatDialogRef<NovaListaComponent>} dialogRef
   */
  constructor(
    private _httpClient: HttpClient,
    public dialogRef: MatDialogRef<NovaListaComponent>,
  ) {}

  ngOnInit() {
  }

  cadastrarNovaTag(): void {
    this.cadastrarTagViaApi().subscribe({
      next: (data) => {
        console.log(data);
      }
    });
  }

  cadastrarTagViaApi(): Observable<Tag> {
    return this._httpClient.post<Tag>('tags', this.tag).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

}
