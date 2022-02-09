import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classe } from '../acervo/model/interfaces/classe.interface';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public getClasses(): Observable<Classe[]> {
    return this._httpClient.get<Classe[]>('classes');
  }

}
