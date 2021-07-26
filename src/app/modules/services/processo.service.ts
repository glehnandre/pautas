import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable, EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Processo } from '../acervo/tabela/tabela.component';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  
  // Informa se os processos foram retirados da pauta (true) ao não (false)
  private isProcessosRemovidos: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public listarProcessos(params?: HttpParams): Observable<Processo[]> {
    return this._httpClient.get<Processo[]>('processos/paginacao', {
      params
    }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public setProcessosRemovidosDaPauta(isRemovido: boolean): void {
    this.isProcessosRemovidos.next(isRemovido);
  }

  public isProcessosRemovidosDaPauta(): Subject<boolean> {
    return this.isProcessosRemovidos;
  }

}
