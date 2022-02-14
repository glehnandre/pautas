import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genero } from 'app/shared/model/enums/genero.enum';
import { Colegiado } from 'app/shared/model/interfaces/colegiado.interface';
import { Frase } from 'app/shared/model/interfaces/frase-genero-plural.interface';
import { Ministro } from 'app/shared/model/interfaces/ministro.interface';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MinistroService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  listarMinistros(): Observable<Ministro[]> {
    return this._httpClient.get<Ministro[]>('/ministro');
  }

  listarMinistrosDoColegiado(colegiado: string): Observable<Ministro[]> {
    return this._httpClient.get<Ministro[]>(`/colegiado/${colegiado}/composicao`);
  }

  listarColegiados(
    colegiado?: string,
    processo?: string,
    data?: string,
  ): Observable<Colegiado[]> {
    let params = new HttpParams();
    params = params.set('processo', processo);
    params = params.set('data', data);
    params = params.set('colegiado', colegiado);

    return this._httpClient.get<Colegiado[]>('/colegiado', {
      params,
    });
  }

  criarColegiado(value: any): Observable<any[]> {
    return this._httpClient.post<any[]>('/colegiado', value);
  }

  /**
   * @description Recebe uma lista de Ministro e
   * retorna o(s) seu(s) nome(s) em uma única string
   *
   * @param (ministros: Ministro[])
   *
   * @return nome dos Ministros string
   *
   * @author Rodrigo Carvalho dos Santos
   */
  ministrosString(ministros: Ministro[]): string {
    if(ministros.length == 1) return ministros[0].nome;
    let nomesMinistros = [], ultimoMinistro;
    ministros.forEach(ministro => nomesMinistros.push(ministro.nome));
    ultimoMinistro = nomesMinistros.pop();
    return [nomesMinistros.join(', '), ultimoMinistro].join(' e ');
   }

  /**
   * @description Recebe uma lista de Ministro e um objeto Frase
   * e verifica se há mais de um Ministro e o genêro do(s) Ministro(s)
   * para usar a frase correspondente.
   *
   * @params ministros: Ministro[], frase: Frase
   *
   * @return string da 'frase' correspondente a singular/plural
   * e gênero dos Ministros
   *
   * @author Rodrigo Carvalho dos Santos
  **/
  generoEPlural(ministros: Ministro[], frase: Frase): string {
    return ministros.length == 1?
      ministros[0].genero == Genero.F ?
        frase?.F:
        frase?.M:
      ministros.filter(({ genero }) => genero == Genero.M).length?
        frase?.PM:
        frase?.PF;
  }
}
