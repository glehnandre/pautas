import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Filtros } from 'app/modules/acervo/filtros/filtros';
import { Processo, SituacaoDoProcesso } from 'app/modules/acervo/tabela/tabela.component';
import { processo as processoData } from 'app/mock-api/pautas/processos/data';
import { tags as tagData } from 'app/mock-api/pautas/tags/data';
import { Tag } from 'app/modules/acervo/acoes/agrupar-emlista/agrupar-emlista.component';
import { Paginacao } from 'app/modules/acervo/tabela/paginacao/paginacao.component';

@Injectable({
    providedIn: 'root'
})
export class ProcessoMockApi {
    private _processo: Processo[] = processoData;
    private _tag: Tag[] = [];

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
                const filtros: Filtros = {
                    situacoes: params.getAll('situacao-processo'),
                    termo: params.get('termo'),
                    primeira_turma: (params.get('colegiado') === 'primeira-turma'),
                    segunda_turma: (params.get('colegiado') === 'segunda-turma'),
                    pleno: (params.get('colegiado') === 'pleno'),
                    classes: params.getAll('classe'),
                    tags: params.getAll('tag'),
                };

                if (params.keys().length > 0) {
                    const processosFiltrados = this._processo
                        .filter(processo => (filtros.situacoes) ? filtros.situacoes.find((situacao) => Number(situacao) === processo.situacao) : true)
                        .filter(processo => (filtros.classes) ? filtros.classes.find(classe => classe === processo.classe) : true)
                        .filter(processo => (filtros.tags) ? filtros.tags.find(tag => processo.lista.find(lista => lista.id === Number(tag))) : true)
                        .filter(processo => (filtros.termo) ? filtros.termo.includes(processo.classe) && filtros.termo.includes(processo.numero.toString()) : true);

                    return [200, processosFiltrados];
                } else {
                    return [200, this._processo];
                }
            });
        
        this._fuseMockApiService
            .onGet('processos/paginacao')
            .reply(({ request }) => {
                const { params } = request;
                const paginacao: Paginacao = {
                    itensPorPagina: +params.get('itensPorPagina') || 5,
                    numeroDaPagina: +params.get('numeroDaPagina') || 0,
                    offset: +params.get('offset') || 0,
                }

                const processosPaginados = this._processo
                    .slice(paginacao.offset, paginacao.offset+paginacao.itensPorPagina);

                return [200, processosPaginados];
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
            .onDelete('processos/:id/pautar')
            .reply(({urlParams}) => {
              const id = +urlParams.id;
              
              this._processo.map(processo => {
                  if (processo.id === id) {
                      processo.situacao = SituacaoDoProcesso['Apto a Julgar'];
                  }
              });
    
              return [201, [this._processo]];
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
