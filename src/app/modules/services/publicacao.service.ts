import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DjeDto } from '../acervo/model/interfaces/djeDto.interface';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {

  link = {"pagina":1,"quantidade":10,"data":1637204400000,"tipoPesquisa":"PUBLICACAO","filtros":{"Tipo":[],"Relator":[]}}
  constructor(private _httpClient: HttpClient,) { 
  }

  recuperarDje(): Observable<any> {
    return this._httpClient.get<any>('https://digital.stf.jus.br/decisoes-publicacoes/api/public/publicacoes').pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }
}
