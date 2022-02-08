import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Filtros } from 'app/modules/acervo/filtros/filtros';

import { Paginacao } from 'app/modules/acervo/tabela/paginacao/paginacao.component';

import { Voto } from 'app/modules/acervo/model/interfaces/voto.interface';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { Impedimento } from 'app/modules/acervo/model/interfaces/impedimento.interface';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { Tag } from 'app/modules/acervo/model/interfaces/tag.interface';
import { Documento } from 'app/modules/acervo/model/interfaces/documento.interface';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';

import { processo as processoData, documentos, votos, tipos, vistas, destaques } from '../processos/data';
import { tags as tagData } from '../tags/data';
import { sessoesDeJulgamento } from '../sessoesDeJulgamento/data';
import { listaImpedimentos, ministro } from '../ministro/data'

import { setStorage, getStorage } from '../storage';
import { Vista } from 'app/modules/acervo/model/interfaces/vista.interface';
import { Destaque } from 'app/modules/acervo/model/interfaces/destaque.interface';


@Injectable({
    providedIn: 'root'
})
export class ProcessoMockApi {
    private _processos: Processo[] = processoData;
    private _julgamentos: SessaoJulgamento[] = sessoesDeJulgamento;
    private _documentos: Documento[] = documentos;
    private _tag: Tag[] = [];
    private _impedimentos: any[] = listaImpedimentos;
    private _votos: Voto[] = votos;
    private _vistas: Vista[] = vistas;
    private _destaques: Destaque[] = destaques;

    constructor(
        private _fuseMockApiService: FuseMockApiService,) {
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

                this._processos.map((processo) => {
                    if (processo.id === id) {
                        processo.lista = this._obterTagsPelosIds(idsTags);
                        processosAtualizados.push(processo);
                    }
                });
                setStorage('processos', this._processos);
                return [201, processosAtualizados];
            });

        this._fuseMockApiService
            .onGet('tags/:id/processos')
            .reply(({urlParams}) => {
                const id = Number(urlParams.id);
                const processos: Processo[] = [];

                this._processos.forEach((processo) => {
                    processo.lista.forEach((lista) => {
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
                let processosFiltrados: Processo[] = [];
                
                if (params.keys().length > 0) {
                    for (const key of params.keys()) {
                        if (key === 'processo') {
                            const id = +params.get(key);

                            processosFiltrados = this._processos.filter(p => {
                                return p.id === +id;
                            });
                        }
                    }

                    console.log(processosFiltrados)
                    return [200, processosFiltrados];
                } else {
                    return [200, this._processos];
                }
            });

        this._fuseMockApiService
            .onDelete('tags/:idTag/processos/:idProcesso')
            .reply(({urlParams}) => {
                const idTag = Number(urlParams.idTag);
                const idProcesso = Number(urlParams.idProcesso);

                const processoRef = this._processos
                    .find(processo => processo.id === idProcesso);

                if (processoRef) {
                    const index = processoRef.lista.findIndex(lista => lista.id === idTag);
                    if (index != -1) {
                        processoRef.lista.splice(index, 1);
                    }
                }

                this._processos.map((processo) => {
                    if (processo.id === idProcesso) {
                        processo = processoRef;
                    }
                });

                return [200, processoRef];
            });

        this._fuseMockApiService
            .onPost('processos/pautar')
            .reply(({request}) => {
                const processo = request.body;

                this._processos.push(processo);

                return [201, this._processos];
            });

        this._fuseMockApiService
            .onDelete('processos/:id/sessao-de-julgamento/:numero-ano')
            .reply(({urlParams}) => {
              const id = +urlParams.id;
              const numeroAno = urlParams['numero-ano'];

              this._julgamentos.map((sessao) => {
                const sessaoNumeroAno = `${sessao.numero}-${sessao.ano}`;
                if(sessaoNumeroAno === numeroAno){
                    this._processos.map((processo) => {
                        if (processo.id === id) {
                            processo.situacao = 1;
                        }
                    });
                }
            });

              return [201, [this._processos]];
            });

        this._fuseMockApiService
            .onPost('/processos/:id/reanalisar')
            .reply(({urlParams}) => {
              const id = +urlParams.id;
              let retorno;
              retorno = this._processos.filter(processo => processo.id === id);

              return [201, retorno];
            });

        this._fuseMockApiService
            .onGet('julgamento/processos/:id/documentos')
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
                          if(processo==lista.processoId){
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
                const index = this._processos.findIndex(p => p.id === idProcesso);

                if (index !== -1) {
                    const relator = ministro.find(m => m.id === idRelator);
                    this._processos[index].relator = relator;
                    setStorage('processos', this._processos);
                    return [200, "Sucesso"];
                }

                return [404, "Nenhum processo encontrado"];
            });

        this._fuseMockApiService
            .onPost('processos/:id/vistas')
            .reply(({request, urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const { body } = request;
                const m = ministro.find(({id}) => id === body.ministro);
                const index = this._processos.findIndex(processo => processo.id === idProcesso);

                body.id = this._vistas.length + 1;
                this._vistas.push({...body, ministro: m });
                const indexVista = this._vistas.length - 1;
                this._processos[index].vistas.push(this._vistas[indexVista]);

                setStorage('vistas', this._vistas);
                setStorage('processos', this._processos);
                return [200, this._vistas[indexVista]];
            });

        this._fuseMockApiService
            .onPut('processos/:id/vistas/:idVista')
            .reply(({request, urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const idVista: number = +urlParams.idVista;
                const { body } = request;
                let index_processo;
                let index_vista;
                const m = ministro.find(({id}) => id === body.ministro);

                index_processo = this._processos.findIndex(processo => processo.id === idProcesso);
                index_vista = this._processos[index_processo].vistas.findIndex(vista => vista.id === idVista)
                this._processos[index_processo].vistas[index_vista].data = body.data;
                this._processos[index_processo].vistas[index_vista].ministro = body.ministro;
                this._processos[index_processo].vistas[index_vista].processo = body.processo;
                this._processos[index_processo].vistas[index_vista].sessao = body.sessao;
                this._processos[index_processo].vistas[index_vista].texto = body.texto;

                setStorage('processos', this._processos);
                return [200, this._processos[index_processo].vistas[index_vista]];
            });

        this._fuseMockApiService
            .onDelete('processos/:id/vistas/:vista')
            .reply(({request, urlParams}) => {
                const id_processo: number = +urlParams.id;
                const id_vista: number = +urlParams.idVista;
                const { body } = request;
                let index_processo;
                let index_vista;
                const m = ministro.find(({id}) => id === body.ministro);

                index_processo = this._processos.findIndex(processo => processo.id === id_processo);
                index_vista = this._processos[index_processo].vistas.findIndex(vista => vista.id === id_vista);
                if(index_vista == -1){
                    this._processos[index_processo].vistas.splice(index_vista, 1);
                    setStorage('processos', this._processos);
                    return [200, "Excluído com sucesso"];
                }
                return [404, {
                    msg: 'Nenhuma Vista com id informado.'
                }];
            });

        this._fuseMockApiService
            .onPost('processos/:id/destaques')
            .reply(({request, urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const { body } = request;
                const m = ministro.find(({id}) => id === body.ministro);
                const index = this._processos.findIndex(({ id }) => id == idProcesso);

                body.id = this._destaques.length + 1;
                this._destaques.push({...body, ministro: m});
                const indexDestaque = this._destaques.length - 1;
                this._processos[index].destaques.push(this._destaques[indexDestaque]);

                setStorage('destaques', this._destaques);
                setStorage('processos', this._processos);
                return [200, this._destaques[indexDestaque]];
            });

        this._fuseMockApiService
            .onPut('processos/:id/destaques/:idDestaque')
            .reply(({request, urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const idDestaque: number = +urlParams.idDestaque;
                const { body } = request;
                let index_processo;
                let index_destaque;
                const m = ministro.find(({id}) => id === body.ministro);

                index_processo = this._processos.findIndex(processo => processo.id === idProcesso);
                index_destaque= this._processos[index_processo].destaques.findIndex(destaque => destaque.id === idDestaque)
                this._processos[index_processo].destaques[index_destaque].data = body.data;
                this._processos[index_processo].destaques[index_destaque].ministro = body.ministro;
                this._processos[index_processo].destaques[index_destaque].processo = body.processo;
                this._processos[index_processo].destaques[index_destaque].sessao = body.sessao;
                this._processos[index_processo].destaques[index_destaque].texto = body.texto;

                setStorage('processos', this._processos);
                return [200, this._processos[index_processo].destaques[index_destaque]];
            });

        this._fuseMockApiService
            .onDelete('processos/:id/destaques/:idDestaque')
            .reply(({request, urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const idDestaque: number = +urlParams.idDestaque;
                const { body } = request;
                let index_processo;
                let index_destaque;
                const m = ministro.find(({id}) => id === body.ministro);

                index_processo = this._processos.findIndex(processo => processo.id === idProcesso);
                index_destaque = this._processos[index_processo].destaques.findIndex(destaque => destaque.id === idDestaque);
                if(index_destaque == -1){
                    this._processos[index_processo].destaques.splice(index_destaque, 1);
                    setStorage('processos', this._processos);
                    return [200, "Excluído com sucesso"];
                }
                return [404, {
                    msg: 'Nenhum Destaque com id informado.'
                }];
            });

        this._fuseMockApiService
            .onPost('processos/:id/impedimentos')
            .reply(({request, urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const { body } = request;

                const index = this._processos
                    .findIndex(p => p.id === idProcesso);

                if (index !== -1) {
                    const processo = this._processos[index];
                    const ministrosImpedidos: Ministro[] = [];
                    const ministrosSuspeitos: Ministro[] = [];

                    body.ministros_impedidos.forEach((id: number) => {
                        ministrosImpedidos.push(this._obterMinistroPeloId(id));
                    });

                    processo.ministros_impedidos = ministrosImpedidos;

                    body.ministros_suspeitos.forEach((id: number) => {
                        ministrosSuspeitos.push(this._obterMinistroPeloId(id));
                    });

                    processo.ministros_suspeitos = ministrosSuspeitos;
                    this._processos[index] = processo;
                    setStorage('processos', this._processos);

                    return [200, processo];
                }

                return [404, {
                    msg: 'Nenhum processo com id informado.'
                }];
            });

        this._fuseMockApiService
            .onGet('processo/:id/capitulos')
            .reply(({urlParams}) => {
              const idProcesso = +urlParams.id;
              let proc;

              getStorage('processo', this._processos);
              proc = this._processos.filter(processo => processo.id === idProcesso);

              return [201, proc.capitulos];
            });

        this._fuseMockApiService
            .onPost('processo/:id/capitulos')
            .reply(({request, urlParams}) => {
              const idProcesso = +urlParams.id;
              const { capitulo, processos_mesma_decisao } = request.body;
              getStorage('processo', this._processos);
              if (idProcesso) {
                const index_processo = this._processos.findIndex(p => p.id === idProcesso);
                if (capitulo.id != null) {
                  const index_capitulo = this._processos[index_processo].capitulos.findIndex(it => it.id === capitulo.id);
                  this._processos[index_processo].capitulos[index_capitulo].descricao = capitulo.descricao;
                  this._processos[index_processo].capitulos[index_capitulo].dispositivo = capitulo.dispositivo;
                  this._processos[index_processo].capitulos[index_capitulo].ministro_condutor = capitulo.ministro_condutor;
                  this._processos[index_processo].capitulos[index_capitulo].ministros_acordam = capitulo.ministros_acordam;
                  this._processos[index_processo].capitulos[index_capitulo].processos_mesma_decisao = processos_mesma_decisao;
                  this._processos[index_processo].capitulos[index_capitulo].sessao = capitulo.sessao;
                  this._processos[index_processo].capitulos[index_capitulo].texto = capitulo.texto;
                  this._processos[index_processo].capitulos[index_capitulo].tipo = capitulo.tipo;
                } else {
                      this._processos[index_processo].capitulos.push({
                        ...capitulo,
                        id: this._processos[index_processo].capitulos.length + 1,
                        processos_mesma_decisao: processos_mesma_decisao
                      });
                      
                }
                setStorage('processos', this._processos);
                return [201, this._processos[index_processo].capitulos];
              }
              
              return [404, {
                description: "Nenhum processo encontrado.",
              }];
            });

            this._fuseMockApiService
            .onDelete('processo/:id/capitulos/:idCapitulo')
            .reply(({request, urlParams}) => {
                const id_processo: number = +urlParams.id;
                const id_capitulo: number = +urlParams.idCapitulo;
                const { body } = request;
                let index_processo;
                let index_capitulo;
                index_processo = this._processos.findIndex(processo => processo.id === id_processo);
                index_capitulo = this._processos[index_processo].capitulos.findIndex(capitulo => capitulo.id === id_capitulo);
                if(index_capitulo == -1){
                    this._processos[index_processo].capitulos.splice(index_capitulo, 1);
                    setStorage('processos', this._processos);
                    return [200, this._processos[index_processo].capitulos];
                }
                return [404, {
                    msg: 'Nenhuma capitulo com id informado.'
                }];
            });
    }

    

    private _obterTagsPelosIds(tags: Tag[]): Tag[] {
        const tagsObtidas: Tag[] = [];
        tags.forEach(({id}) => {
            const tagEncontrada = this._tag.find(tag => tag.id === id);
            if (tagEncontrada) {
                tagsObtidas.push(tagEncontrada);
            }
        });

        return tagsObtidas;
    }

    private _obterMinistroPeloId(id: number): Ministro {
        const index = ministro.findIndex(m => m.id == id);

        if (index !== -1) {
            return ministro[index];
        }

        return null;
    }
}
