import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RevisarInteiroTeorService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public obterInteiroTeorDoAcordao(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('id', id);

    return this._httpClient.get<any>('/inteiro-teor', {
      params,
    }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

}
