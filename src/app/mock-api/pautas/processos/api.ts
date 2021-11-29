import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Filtros } from 'app/modules/acervo/filtros/filtros';
import { processo as processoData, documentos, votos, tipos, vistas, destaques } from 'app/mock-api/pautas/processos/data';
import { tags as tagData } from 'app/mock-api/pautas/tags/data';
import { Paginacao } from 'app/modules/acervo/tabela/paginacao/paginacao.component';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { Tag } from 'app/modules/acervo/model/interfaces/tag.interface';
import { Documento } from 'app/modules/acervo/model/interfaces/documento.interface';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';
import { julgamentos } from '../julgamentos/data';
import { Impedimento } from 'app/modules/acervo/model/interfaces/impedimento.interface';
import { listaImpedimentos, ministro } from '../ministro/data'
import { Voto } from 'app/modules/acervo/model/interfaces/voto.interface';
import { Vista } from 'app/modules/acervo/model/interfaces/vista.interface';
import { Destaque } from 'app/modules/acervo/model/interfaces/destaque.interface';

@Injectable({
    providedIn: 'root'
})
export class ProcessoMockApi {
    private _processo: Processo[] = processoData;
    private _julgamentos: SessaoJulgamento[] = julgamentos;
    private _documentos: Documento[] = documentos;
    private _tag: Tag[] = [];
    private _impedimentos: any[] = listaImpedimentos;
    private _votos: Voto[] = votos;
    private _vistas: Vista[] = vistas;
    private _destaques: Destaque[] = destaques;

    constructor(
        private _fuseMockApiService: FuseMockApiService,) {
        this._processo = processoData;
        this._tag = tagData;
        this.registerHandlers();
    }

    registerHandlers(): void {
        this._fuseMockApiService
            .onPut('processos/:id/tag')
            .reply(({request, urlParams}) => {
                const id = Number(urlParams.id);
                const { idsTags } = request.body;
                const processosAtualizados = [];

                this._processo.map(processo => {
                    if (processo.id === id) {
                        processo.lista = this._obterTagsPelosIds(idsTags);
                        processosAtualizados.push(processo);
                    }
                });

                return [201, processosAtualizados];
            });

        this._fuseMockApiService
            .onGet('tags/:id/processos')
            .reply(({urlParams}) => {
                const id = Number(urlParams.id);
                const processos: Processo[] = [];

                this._processo.forEach(processo => {
                    processo.lista.forEach(lista => {
                        if (lista.id === id) {
                            processos.push(processo);
                        }
                    });
                });

                return [200, processos];
            });

        this._fuseMockApiService
            .onGet('processos')
            .reply(({ request }) => {
                const { params } = request;

                if (params.get('itensPorPagina') && params.get('itensPorPagina') !== 'undefined') {
                    const paginacao: Paginacao = {
                        itensPorPagina: +params.get('itensPorPagina') || 5,
                        numeroDaPagina: +params.get('numeroDaPagina') || 0,
                        offset: +params.get('offset') || 0,
                    }
    
                    const processosPaginados = this._processo
                        .slice(paginacao.offset, paginacao.offset+paginacao.itensPorPagina);
    
                    return [200, processosPaginados];
                } else {
                    const filtros: Filtros = {
                        processo: params.get('processo'),
                        situacoes: params.getAll('situacao-processo'),
                        termo: params.get('termo'),
                        primeira_turma: (params.get('colegiado') === 'primeira-turma'),
                        segunda_turma: (params.get('colegiado') === 'segunda-turma'),
                        pleno: (params.get('colegiado') === 'pleno'),
                        classes: params.getAll('classe'),
                        tags: (params.getAll('tag')) ? params.getAll('tag').toString().split(',') : null,
                    };

                    if (params.keys().length > 0) {
                        const processosFiltrados = this._processo
                            .filter(processo => (filtros.processo) ? processo.id === +filtros.processo : true)
                            .filter(processo => (filtros.situacoes) ? filtros.situacoes.find((situacao) => Number(situacao) === processo.situacao) : true)
                            .filter(processo => (filtros.classes) ? filtros.classes.find(classe => classe === processo.classe) : true)
                            .filter(processo => (filtros.tags) ? filtros.tags.find(tag => processo.lista.find(lista => lista.id === +tag)) : true)
                            .filter(processo => (filtros.termo) ? filtros.termo.includes(processo.classe) && filtros.termo.includes(processo.numero.toString()) : true);
                        return [200, processosFiltrados];
                    } else {
                        return [200, this._processo];
                    }
                }
            });

        this._fuseMockApiService
            .onDelete('tags/:idTag/processos/:idProcesso')
            .reply(({urlParams}) => {
                const idTag = Number(urlParams.idTag);
                const idProcesso = Number(urlParams.idProcesso);

                const processoRef = this._processo
                    .find(processo => processo.id === idProcesso);

                if (processoRef) {
                    const index = processoRef.lista.findIndex(lista => lista.id === idTag);
                    if (index != -1) {
                        processoRef.lista.splice(index, 1);
                    }
                }

                this._processo.map(processo => {
                    if (processo.id === idProcesso) {
                        processo = processoRef;
                    }
                })

                return [200, processoRef];
            });

        this._fuseMockApiService
            .onPost('processos/pautar')
            .reply(({request}) => {
                const processo = request.body;

                this._processo.push(processo);

                return [201, [this._processo]];
            });

        this._fuseMockApiService
            .onDelete('processos/:id/sessao-de-julgamento/:numero-ano')
            .reply(({urlParams}) => {
              const id = +urlParams.id;
              const numeroAno = urlParams['numero-ano'];

              this._julgamentos.map(sessao => {
                const sessaoNumeroAno = `${sessao.numero}-${sessao.ano}`;
                if(sessaoNumeroAno === numeroAno){
                    this._processo.map(processo => {
                        if (processo.id === id) {
                            processo.situacao = 1;
                        }
                    });
                }
            })

              return [201, [this._processo]];
            });

        this._fuseMockApiService
            .onPost('/processos/:id/reanalisar')
            .reply(({urlParams}) => {
              const id = +urlParams.id;

              this._processo = this._processo.filter(processo => {
                  return processo.id !== id;
              });

              return [201, [this._processo]];
            });

        this._fuseMockApiService
            .onGet('processos/:id/documentos')
            .reply(({urlParams}) => {
              const id = +urlParams.id;

              return [201, this._documentos];
            });
        
        this._fuseMockApiService
            .onGet('processos/:processo/impedimentos/:ministro')
            .reply(({urlParams}) => {
              const processo = urlParams.processo;
              const ministro = urlParams.ministro;
              let impedimentos: Impedimento[] = [];

              this._impedimentos.forEach(data=>{
                  if(ministro==data.ministro){
                      data.lista.forEach(lista=>{
                          if(processo==lista.processo){
                            impedimentos=lista.impedimento;
                          }
                      })
                  }
              })

              return [201, impedimentos];
            });

        this._fuseMockApiService
            .onGet('processos/:processo/votos')
            .reply(({urlParams}) => {
              const processo = urlParams.processo;



              return [201, this._votos];
            });

        this._fuseMockApiService
            .onGet('processos/tipos')
            .reply(({}) => {
                return [200, tipos];
            });

        this._fuseMockApiService
            .onPost('processos/:id/relator')
            .reply(({request, urlParams}) => {
                const idProcesso = +urlParams.id;
                const idRelator = request.body as number;
                const index = this._processo.findIndex(p => p.id === idProcesso);

                if (index !== -1) {
                    const relator = ministro.find(m => m.id === idRelator);
                    this._processo[index].relator = relator;
                    console.log(this._processo[index])
                    return [200, { description: "Sucesso" }];
                }

                return [404, { description: "Nenhum processo encontrado" }];
            });

        this._fuseMockApiService
            .onPost('processos/:id/vista')
            .reply(({request, urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const body = request.body as Vista;

                this._vistas.push(body);

                return [200, this._vistas];
            });

        this._fuseMockApiService
            .onPost('processos/:id/destaque')
            .reply(({request, urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const body = request.body as Destaque;

                this._destaques.push(body);

                return [200, this._destaques];
            });
    }

    private _obterTagsPelosIds(tags: Tag[]): Tag[] {
        let tagsObtidas: Tag[] = [];

        tags.forEach(({id}) => {
            const tagEncontrada = this._tag.find(tag => tag.id === id);
            if (tagEncontrada) {
                tagsObtidas.push(tagEncontrada);
            }
        });

        return tagsObtidas;
    }
}
