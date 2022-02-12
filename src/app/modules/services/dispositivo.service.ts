import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dispositivo } from 'app/shared/model/interfaces/dispositivo.interface';
import { Observable } from 'rxjs';


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
