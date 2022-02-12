import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from 'app/shared/model/interfaces/classe.interface';
import { Observable } from 'rxjs';


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
