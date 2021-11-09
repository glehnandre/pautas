import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RevisaoInteiroTeor } from '../revisar-inteiro-teor/revisar-inteiro-teor.component';

@Injectable({
  providedIn: 'root'
})
export class RevisarInteiroTeorService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public obterInteiroTeorDoAcordao(id: number): Observable<RevisaoInteiroTeor> {
    let params = new HttpParams();
    params = params.set('id', id);

    return this._httpClient.get<RevisaoInteiroTeor>('/inteiro-teor', {
      params,
    }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

}
