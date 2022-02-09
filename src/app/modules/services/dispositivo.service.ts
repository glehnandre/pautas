import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dispositivo } from '../acervo/model/interfaces/dispositivo.interface';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public obterDispositivos(id: number, tipo: string): Observable<Dispositivo[]> {
    return this._httpClient.get<Dispositivo[]>(`dispositivos/processo/${id}/tipo-capitulo/${tipo}`);
  }

}
