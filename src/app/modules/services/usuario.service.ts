import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Secretario } from '../acervo/model/interfaces/secretario.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  
  public getTodosUsuarios(): Observable<Secretario[]> {
    return this._httpClient.get<Secretario[]>('secretarios');
  }

  public getUsuario(idUsuario: number){
    let params = new HttpParams();
    params = params.append('id', idUsuario);
    return this._httpClient.get<Secretario[]>('secretarios', {params});
  }

}