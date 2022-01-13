import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { DocumentoInteiroTeor } from 'app/modules/acervo/model/interfaces/documento-inteiro-teor.interface';
import { Documento } from 'app/modules/acervo/model/interfaces/documento.interface';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { RevisaoInteiroTeor } from 'app/modules/revisar-inteiro-teor/revisar-inteiro-teor.component';

import { revisoes } from './data';
import { processo as processosData, documentos as documentosData } from '../processos/data';
import { getStorage, setStorage } from '../storage';

@Injectable({
    providedIn: 'root'
})
export class RevisaoInteiroTeorMockApi {
    private _revisoes: Array<RevisaoInteiroTeor> = getStorage('revisoes', revisoes);
    private _processos: Processo[] = processosData;
    private _documentos: Documento[] = documentosData;

    constructor(
      private _fuseMockApiService: FuseMockApiService
    ) {
      this.registerHandlers();
    }

    registerHandlers(): void {
      this._fuseMockApiService
        .onGet('/inteiro-teor')
        .reply(({request}) => {
          const { params } = request;
          const id: number = +params.get('id');

          const revisao = this._revisoes
            .find(rev => rev.id_processo === id);

          if (revisao !== undefined) {
            return [200, revisao];
          } else {
            return [200, {
              description: "Não há processo associado a esse processo.",
            }];
          }
        });

      this._fuseMockApiService
        .onPut('/inteiro-teor')
        .reply(({request}) => {
          const { params, body } = request;
          const id: number = +params.get('id');
          const documentos = body as DocumentoInteiroTeor[];

          const revisao = this._revisoes
            .find(rev => rev.id_processo === id);

          if (revisao !== undefined) {
            revisao.documentos = documentos;

            return [200, revisao];
          } else {
            return [200, {
              description: "Não há processo associado a esse processo.",
            }];
          }
        });

      this._fuseMockApiService
        .onPost('/inteiro-teor/:id')
        .reply(({request, urlParams}) => {
          const { body } = request;
          const id: number = +urlParams.id;
          const documentos = body as number[];

          const revisao = this._revisoes
            .find(rev => rev.id_processo === id);

          if (revisao !== undefined) {
            let documentosAdicionados: DocumentoInteiroTeor[] = [];

            let ordemDoDocumentoAdicionado = revisao.documentos.length;

            documentos.forEach(idDoc => {
              const documento = this._documentos.find(d => d.id === idDoc);

              ordemDoDocumentoAdicionado++;

              const documentoModificado = {
                    id: documento.id,
                    arquivo: documento.url,
                    autores: [],
                    responsavel: {},
                    comentario: '',
                    nome: documento.nome,
                    data_criacao: documento.data_criacao,
                    situacao: documento.status,
                    revisado: false,
                    ordem: ordemDoDocumentoAdicionado,
              } as DocumentoInteiroTeor;

              if (documento !== undefined) {
                documentosAdicionados.push(documentoModificado);
              }
            });

            revisao.documentos = [...revisao.documentos, ...documentosAdicionados];

            return [200, revisao];
          } else {
            return [200, {
              description: "Não há processo associado a esse processo.",
            }];
          }
        });

      this._fuseMockApiService
        .onDelete('/inteiro-teor/:id')
        .reply(({request, urlParams}) => {
          const { params } = request;
          const id: number = +urlParams.id;
          const documentos = [...params.get('processos').replace(',', '')];

          const revisao = this._revisoes
            .find(rev => rev.id_processo === id);

          if (revisao !== undefined) {
            revisao.documentos = revisao.documentos.map((documento) => {
                if (documentos.includes(String(documento.id))) {
                    documento.situacao = "Removido";
                }
                return documento;
            })

            return [200, revisao];
          } else {
            return [200, {
              description: "Não há processo associado a esse processo.",
            }];
          }
        });

      this._fuseMockApiService
        .onPost('/inteiro-teor/:id/publicar')
        .reply(({request, urlParams}) => {
          const { body } = request;
          const id: number = +urlParams.id;
          const documentos = body as number[];

          const revisao = this._revisoes
            .find(rev => rev.id_processo === id);

            if (revisao !== undefined) {
              const processo = this._processos.find(p => p.id === revisao.id_processo);
              let documentosDoProcesso = [];

              documentos.forEach(idDoc => {
                const documento = this._documentos.find(d => d.id === idDoc);

                if (documento !== undefined) {
                  documentosDoProcesso.push(documento);
                }
              });

              processo.documentos = documentosDoProcesso;

              setStorage('revisoes', this._revisoes);

              return [200, processo];
            } else {
            return [200, {
              description: "Não há processo associado a esse processo.",
            }];
          }
        });
    }
}
