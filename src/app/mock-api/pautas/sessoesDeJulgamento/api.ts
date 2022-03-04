import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Processo } from 'app/shared/model/interfaces/processo.interface';
import { Secretario } from 'app/shared/model/interfaces/secretario.interface';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';
import { Suspensao } from 'app/shared/model/interfaces/suspensao.interface';
import { processo as processosData } from '../processos/data';
import { setStorage } from '../storage';
import { secretarios, sessoesDeJulgamento } from './data';

@Injectable({
  providedIn: 'root'
})
export class SessaoDeJulgamentoMockApi {
  private _julgamentos: SessaoDeJulgamento[] = sessoesDeJulgamento;
  private _processos: Processo[] = processosData;
  private _secretarios: Secretario[] = secretarios;
  private _sessaoDeJulgamentos: SessaoDeJulgamento[] = sessoesDeJulgamento;

  constructor(
    private _fuseMockApiService: FuseMockApiService,
  ) {
    this.registerHandlers();
  }

  registerHandlers(): void {
    this._fuseMockApiService
      .onPost('julgamentos')
      .reply(({ request }) => {
        const julgamento = request.body;

        this._julgamentos.push(julgamento);

        return [201, {
          msg: 'Processo pautado com sucesso!'
        }];
      });

    this._fuseMockApiService
      .onPost('sessoes-de-julgamento')
      .reply(({ request, urlParams }) => {

        return [200, this._julgamentos[0]];
      });

    this._fuseMockApiService
      .onGet('sessoes-de-julgamento')
      .reply(({ request, urlParams }) => {

        return [200, this._julgamentos];
      });

    this._fuseMockApiService
      .onGet('sessoes-de-julgamento/:numero-ano')
      .reply(({ request, urlParams }) => {
        const numeroAno = urlParams['numero-ano'];
        let sessaoDeJulgamento: any = this._julgamentos.find(julg => {
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
      .onGet('sessoes-de-julgamento/:numero-ano/pauta')
      .reply(({ request, urlParams }) => {
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
      .reply(({ request, urlParams }) => {
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
      .reply(({ request, urlParams }) => {
        const numeroAno = urlParams['numero-ano'];

        let sessaoDeJulgamento;
        this._julgamentos
          .map(julg => {
            let numeroano = `${julg.numero}-${julg.ano}`;
            if (numeroano == numeroAno) {
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
      .reply(({ request, urlParams }) => {
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

          return [200, { description: 'Sucesso' }];
        } else {
          return [404, { description: 'Sessao de julgamento não foi encontrada' }];
        }
      });

    this._fuseMockApiService
      .onGet('sessoes-de-julgamento/:numero-ano/ata')
      .reply(({ request, urlParams }) => {
        const numeroAno = urlParams['numero-ano'];
        let indexJulgamento = this._julgamentos.findIndex(sessao => sessao.numero + "-" + sessao.ano === numeroAno);
        if (indexJulgamento != -1) {
          return [200, this._julgamentos[indexJulgamento].ata];
        } else {
          return [404, { description: 'Nenhuma sessão de julgamento aberta para o periodo encontrada. Pode haver sessão de julgamento fechadas para o período.' }];
        }
      });

    this._fuseMockApiService
      .onGet('secretarios')
      .reply(({ request }) => {
        const idPessoa = Number(request.params.get('id'));
        const nome = request.params.get('nome');
        let index = 0;
        if (idPessoa !== 0) {
          index = this._secretarios.findIndex(secretario => secretario.id === idPessoa);
        } else if (nome !== null) {
          index = this._secretarios.findIndex(secretario => secretario.nome.includes(nome));
        }
        if (index == 0) {
          return [200, this._secretarios];
        } else if (index != -1) {
          return [200, this._secretarios[index]];
        } else {
          return [404, { description: 'Nenhum secretário com esse nome foi encontrado.' }];
        }
      });

    this._fuseMockApiService
      .onPut('sessao-de-julgamento/:numero-ano/processo/:idProcesso/suspensao')
      .reply(({ request, urlParams }) => {
        const numeroAno = urlParams['numero-ano'];
        const idProcesso = +urlParams.idProcesso;
        const suspensao = request.body as Suspensao;

        const indexJulgamento = this._sessaoDeJulgamentos.findIndex(julg => {
          const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
          return sessaoNumeroAno === numeroAno;
        });

        if (indexJulgamento === -1) {
          return [404, 'Julgamento não encontrado.'];
        }

        const indexProcesso = this._sessaoDeJulgamentos[indexJulgamento].processos
          .findIndex(p => p.id === idProcesso);

        if (indexProcesso === -1) {
          return [404, 'Processo não encontrado.'];
        }
        if(suspensao.id != undefined){
          const indexSuspensao = this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].suspensoes
          .findIndex(s => {
              const sessao = sessoesDeJulgamento.find(sj => sj.numero === +s.sessao);
              const sessaoNumeroAno = `${sessao.numero}-${sessao.ano}`;
              return +s.id === suspensao.id && +s.processo === idProcesso && sessaoNumeroAno === numeroAno
            }
          );
          if (indexSuspensao !== -1) { // Já existe uma suspensão
            this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].suspensoes[indexSuspensao] = suspensao;
            setStorage('sessoesDeJulgamento', this._sessaoDeJulgamentos);
            return [200, 'Suspensão atualizada com sucesso!'];
          }
        }else{
          suspensao.id = this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso]?.suspensoes?.length + 1;
          this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].suspensoes.push(suspensao);
          setStorage('sessoesDeJulgamento', this._sessaoDeJulgamentos);
          return [200, 'Suspensão cadastrada com sucesso!'];
        }
      });

    this._fuseMockApiService
      .onDelete('sessao-de-julgamento/:numero-ano/processo/:idProcesso/suspensao/:idSuspensao')
      .reply(({ urlParams }) => {
        const idSuspensao = +urlParams.idSuspensao;
        const idProcesso = +urlParams.idProcesso;
        const numeroAno = urlParams['numero-ano'];

        const indexJulgamento = this._sessaoDeJulgamentos.findIndex(julg => {
          const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
          return sessaoNumeroAno === numeroAno;
        });

        if (indexJulgamento === -1) {
          return [404, 'Julgamento não encontrado :('];
        }

        const indexProcesso = this._sessaoDeJulgamentos[indexJulgamento].processos
          .findIndex(p => p.id === idProcesso);

        if (indexProcesso === -1) {
          return [404, 'Processo não encontrado :('];
        }

        const indexSuspensao = this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].suspensoes
          .findIndex(s => {
            const sessao = sessoesDeJulgamento.find(sj => sj.numero === +s.sessao);
            const sessaoNumeroAno = `${sessao.numero}-${sessao.ano}`;

            return +s.id === idSuspensao && +s.processo === idProcesso && sessaoNumeroAno === numeroAno
          }
          );

        if (indexSuspensao !== -1) { // Já existe uma suspensão
          this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].suspensoes.splice(indexSuspensao, 1);
          setStorage('sessoesDeJulgamento', this._sessaoDeJulgamentos);
          return [200, 'Suspensão excluída com sucesso!'];
        } else {
          return [404, 'Nenhuma suspensão encontrada!'];
        }
      });
  }
}
