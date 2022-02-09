import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { SessaoDeJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface'

import { sessoesDeJulgamento, processos as processosData, secretarios } from './data';
import { setStorage } from '../storage';
import { Secretario } from 'app/modules/acervo/model/interfaces/secretario.interface';


@Injectable({
    providedIn: 'root'
})
export class SessaoDeJulgamentoMockApi {
    private _julgamentos: SessaoDeJulgamento[] = sessoesDeJulgamento;
    private _processos: Processo[] = processosData;
    private _secretarios: Secretario[] = secretarios;
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
          let sessaoDeJulgamento: any = this._julgamentos.find(julg => {
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
        .onPost('sessoes-de-julgamento/:numero-ano/finalizar')
        .reply(({request, urlParams}) => {
          const numeroAno = urlParams['numero-ano'];
          const {
            presidencia,
            ministros_ausentes,
            ministros_presentes,
            cabecalho,
            outros_presentes,
            secretario
          } = request.body;
          let indexJulgamento = this._julgamentos.findIndex(julg => {
            const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
            return sessaoNumeroAno === numeroAno;
          });
          
          if (indexJulgamento != -1) {

            this._julgamentos[indexJulgamento].ata.presidencia = presidencia;
            this._julgamentos[indexJulgamento].ata.ministros_presentes = ministros_presentes;
            this._julgamentos[indexJulgamento].ata.ministros_ausentes = ministros_ausentes;
            this._julgamentos[indexJulgamento].ata.cabecalho = cabecalho;
            this._julgamentos[indexJulgamento].ata.outros_presentes = outros_presentes;
            this._julgamentos[indexJulgamento].ata.secretario = secretario;

            setStorage('sessoesDeJulgamento', this._julgamentos);
            
            return [200, { description: 'Sucesso'}];
          } else {
            return [404, { description: 'Sessao de julgamento não foi encontrada' }];
          }
        });

        this._fuseMockApiService
        .onGet('sessoes-de-julgamento/:numero-ano/ata')
        .reply(({request, urlParams}) => {
          const numeroAno = urlParams['numero-ano'];
          let indexJulgamento = this._julgamentos.findIndex(sessao => sessao.numero + "-" + sessao.ano === numeroAno);
          if (indexJulgamento != -1) {
            return [200, this._julgamentos[indexJulgamento].ata];
          }else{
            return [404, { description: 'Nenhuma sessão de julgamento aberta para o periodo encontrada. Pode haver sessão de julgamento fechadas para o período.' }];
          }
        });

        this._fuseMockApiService
        .onGet('secretarios')
        .reply(({request}) => {
          console.log("ENTREI NA PESQUSA DE SECRETARIOS");
          const idPessoa = Number(request.params.get('id'));
          const nome = request.params.get('nome');
          let index = 0;
          console.log(idPessoa);
          console.log(nome);
          if(idPessoa !== 0){
            index = this._secretarios.findIndex(secretario => secretario.id === idPessoa);
          }else if(nome !== null){
            index = this._secretarios.findIndex(secretario => secretario.nome.includes(nome));
          }
          
          console.log(index);
          if(index == 0){
            console.log("retornar todos os secretarios...");
            return [200, this._secretarios];
          }else if (index != -1) {
            return [200, this._secretarios[index]];
          }else{
            return [404, { description: 'Nenhum secretário com esse nome foi encontrado.' }];
          }
        });
    }
}
