import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from 'app/modules/services/julgamento.service';
import { julgamentos as julgamentoData, processos as processosData } from './data';

@Injectable({
    providedIn: 'root'
})
export class JulgamentoMockApi {
    private _julgamentos: SessaoJulgamento[] = julgamentoData;
    private _processos: Processo[] = processosData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this._julgamentos = julgamentoData;
        this._processos = processosData;
        this.registerHandlers();
    }
    
    registerHandlers(): void {
      this._fuseMockApiService
        .onPost('julgamentos')
        .reply(({request}) => {
          const julgamento = request.body;

          this._julgamentos.push(julgamento);

          return [201, {
            msg: 'Processo pautado com sucesso!'
          }];
        });

      this._fuseMockApiService
        .onPost('sessoes-de-julgamento')
        .reply(({request, urlParams}) => {

          return [200, this._julgamentos[0]];
        });

      this._fuseMockApiService
        .onGet('sessoes-de-julgamento/:numero-ano')
        .reply(({request, urlParams}) => {
          const numeroAno = urlParams['numero-ano'];

          const sessaoDeJulgamento = this._julgamentos
            .find(julg => {
              const sessaoNumeroAno = `${julg.sessao.numero}-${julg.sessao.ano}`;
              return sessaoNumeroAno === numeroAno;
            });

          if (sessaoDeJulgamento) {
            return [200, sessaoDeJulgamento];
          } else {
            return [404, { description: 'Sessao de julgamento não foi encontrada' }];
          }
        });

      this._fuseMockApiService
        .onGet('sessoes-de-julgamento/:numero-ano/pauta')
        .reply(({request, urlParams}) => {
          const numeroAno = urlParams['numero-ano'];
          const { params } = request;

          const situacao = +params.get('situacao');
          const inicio = params.get('inicio');
          const fim = params.get('fim'); 

          const processos = this._processos
            .filter(processo => (situacao) ? (processo.situacao === situacao) : true);
            // Filtrar por data de inicio e fim 

          if (processos.length > 0) {
            return [200, processos];
          } else {
            return [404, { description: 'Nenhuma sessão de julgamento aberta para o periodo encontrada. Pode haver sessão de julgamento fechadas para o período.' }];
          }
        });
    }
}
