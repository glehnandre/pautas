import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Tag } from 'app/shared/model/interfaces/tag.interface';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-nova-lista',
  templateUrl: './nova-lista.component.html',
  styleUrls: ['./nova-lista.component.scss']
})
export class NovaListaComponent implements OnInit {

  listaFormGroup: FormGroup;

  /**
   * Constructor
   *
   * @param {MatDialogRef<NovaListaComponent>} dialogRef
   */
  constructor(
    private _httpClient: HttpClient,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<NovaListaComponent>,
  ) {
    this.listaFormGroup = this._fb.group({
      descricao: ['', [Validators.required]],
      publica: [false, [Validators.required]],
    });
  }

  ngOnInit() {
  }

  cadastrarNovaTag(): void {
    if (this.listaFormGroup.valid) {
      this.cadastrarTagViaApi().subscribe({
        next: (data) => {
          this.dialogRef.close('ok');
        }
      });
    }
  }

  cadastrarTagViaApi(): Observable<Tag> {
    return this._httpClient.post<Tag>('tags', this.listaFormGroup.value).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  fechar(): void {
    this.dialogRef.close('');
  }

}
