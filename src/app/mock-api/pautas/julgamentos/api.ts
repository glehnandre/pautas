import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Ata } from 'app/modules/acervo/model/interfaces/ata.interface';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface'

import { capitulos_para_publicacao, atas } from '../ata/data';
import { julgamentos, processos as processosData } from './data';
import { getStorage, setStorage } from '../storage';

@Injectable({
    providedIn: 'root'
})
export class JulgamentoMockApi {
    private _julgamentos: SessaoJulgamento[] = getStorage('julgamentos', julgamentos);
    private _processos: Processo[] = processosData;
    private _atas: Ata[] = getStorage('atas', atas);

    constructor(private _fuseMockApiService: FuseMockApiService) {
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
        .onGet('sessoes-de-julgamento')
        .reply(({request, urlParams}) => {

          return [200, this._julgamentos];
        });

      this._fuseMockApiService
        .onGet('sessoes-de-julgamento/:numero-ano')
        .reply(({request, urlParams}) => {
          const numeroAno = urlParams['numero-ano'];

          let sessaoDeJulgamento: any = this._julgamentos
            .find(julg => {
              const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
              return sessaoNumeroAno === numeroAno;
            });

          if (sessaoDeJulgamento) {
            sessaoDeJulgamento = {...sessaoDeJulgamento, ministro: {
              id: 12314441,
              nome: "Luiz Fux",
              abreviacao: "MLF",
              cadeira: {
                criacao: '2021-08-02T03:00:00.000Z',
                numero: 100,
              }
            }, observacao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro minima quibusdam perspiciatis aliquid iste quo deleniti  ducimus nulla minus rerum expedita tenetur, dicta saepe error unde,  labore cum, aperiam nisi. Lorem ipsum dolor sit amet consectetur adipisicing elit.  Odit sequi magni, modi reprehenderit sit ipsa tempora natus  harum voluptatem iure molestias, veniam nemo quam odio qui laboriosam.  Pariatur, praesentium molestiae?",};
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

        this._fuseMockApiService
        .onPut('sessoes-de-julgamento/:numero-ano/aprovar')
        .reply(({request, urlParams}) => {
          const numeroAno = urlParams['numero-ano'];

          const sessaoDeJulgamento = this._julgamentos
            .find(julg => {
              const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
              return sessaoNumeroAno === numeroAno;
            });

          if (sessaoDeJulgamento) {
            return [200, sessaoDeJulgamento];
          } else {
            return [404, { description: 'Sessao de julgamento não foi encontrada' }];
          }
        });

        this._fuseMockApiService
        .onPut('sessoes-de-julgamento/:numero-ano/rejeitar')
        .reply(({request, urlParams}) => {
          const numeroAno = urlParams['numero-ano'];

          let sessaoDeJulgamento;
          this._julgamentos
            .map(julg => {
              let numeroano = `${julg.numero}-${julg.ano}`;
              if(numeroano == numeroAno){
                julg.situacao = "REJEITADA";
                sessaoDeJulgamento = julg;
              }
            });

          if (sessaoDeJulgamento) {
            return [200, sessaoDeJulgamento];
          } else {
            return [404, { description: 'Sessao de julgamento não foi encontrada' }];
          }
        });

        this._fuseMockApiService
        .onPut('sessoes-de-julgamento/:numero-ano/finalizar')
        .reply(({request, urlParams}) => {
          const numeroAno = urlParams['numero-ano'];
          const {
            presidencia,
            ministros_ausentes,
            ministros_presentes,
            cabecalho,
            outros_presentes,
          } = request.body;
          let indexJulgamento = this._julgamentos
          .findIndex(({ numero, ano}) => `${numero}-${ano}` == numeroAno);

          if (indexJulgamento != -1) {
            let sessaoDeJulgamento = this._julgamentos[indexJulgamento];

            sessaoDeJulgamento.presidencia = presidencia;
            sessaoDeJulgamento.ministros_presentes = ministros_presentes;
            sessaoDeJulgamento.ministros_ausentes = ministros_ausentes;

            this._julgamentos.splice(indexJulgamento, 1);
            this._julgamentos.push(sessaoDeJulgamento);

            let indexAta = this._atas.findIndex(({ sessao }) => sessao.id == sessaoDeJulgamento.id);
            if( indexAta != -1)
              this._atas.splice(indexAta, 1);

            this._atas.push({
              cabecalho,
              outros_presentes,
              total_destaque: 0,
              total_julgados: 3,
              total_nao_julgados: 1,
              total_vista: 4,
              total_suspensos: 1,
              sessao: sessaoDeJulgamento,
              capitulos_para_publicacao
            } as Ata);
            setStorage('julgamentos', this._julgamentos);
            setStorage('atas', this._atas);

            return [200, { description: 'Sucesso'}];
          } else {
            return [404, { description: 'Sessao de julgamento não foi encontrada' }];
          }
        });
    }
}
