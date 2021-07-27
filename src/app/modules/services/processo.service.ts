import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable, EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Processo } from '../acervo/tabela/tabela.component';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  
  // Informa se os processos precisam ser carregados novamente
  private isCarregarProcessos: Subject<boolean> = new Subject<boolean>();

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

  public reanalizarProcesso(id: number, body: {descricao: string}): Observable<void> {
    return this._httpClient.put<void>(`/processos/${id}/reanalisar`, body);
  }

  public setCarregarProcessos(carregarProcessos: boolean): void {
    this.isCarregarProcessos.next(carregarProcessos);
  }

  public isCarregarProcesso(): Subject<boolean> {
    return this.isCarregarProcessos;
  }

  public exibeDescricaoDosProcessos(processos: Processo[]): string {
    let descricoes = ``;

    processos.forEach(processo => {
      descricoes += `${processo.classe} ${processo.numero} ${processo.nome}\n`;
    });

    return descricoes;
  }

}
