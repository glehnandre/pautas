import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Documento } from 'app/shared/model/interfaces/documento.interface';
import { Impedimento } from 'app/shared/model/interfaces/impedimento.interface';
import { Ministro } from 'app/shared/model/interfaces/ministro.interface';
import { Processo } from 'app/shared/model/interfaces/processo.interface';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';
import { Tag } from 'app/shared/model/interfaces/tag.interface';
import { Voto } from 'app/shared/model/interfaces/voto.interface';
import { listaImpedimentos, ministro } from '../ministro/data';
import { documentos, processo as processoData, tipos, votos } from '../processos/data';
import { sessoesDeJulgamento } from '../sessoesDeJulgamento/data';
import { setStorage } from '../storage';
import { tags as tagData } from '../tags/data';




@Injectable({
    providedIn: 'root'
})
export class ProcessoMockApi {
    private _processos: Processo[] = processoData;
    private _sessaoDeJulgamentos: SessaoDeJulgamento[] = sessoesDeJulgamento;
    private _documentos: Documento[] = documentos;
    private _tag: Tag[] = [];
    private _impedimentos: any[] = listaImpedimentos;
    private _votos: Voto[] = votos;

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

              this._sessaoDeJulgamentos.map((sessao) => {
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
            .onPost('sessao-de-julgamento/:numeroAno/processos/:id/relator')
            .reply(({request, urlParams}) => {
                const idProcesso = +urlParams.id;
                const idRelator = request.body as number;
                const numeroAno = urlParams['numeroAno'];

                let indexJulgamento = this._sessaoDeJulgamentos.findIndex(julg => {
                    console.log(numeroAno);
                    const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
                    return sessaoNumeroAno === numeroAno;
                });
    
                if(indexJulgamento != -1){
                      let indexProcesso = this._sessaoDeJulgamentos[indexJulgamento].processos.findIndex(processo => processo.id === idProcesso);
                      if(indexProcesso != -1){
                        const relator = ministro.find(m => m.id === idRelator);
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].relator = relator;
                        setStorage('sessoesDeJulgamento', this._sessaoDeJulgamentos);
                        return [200, "Sucesso"];
                      } else return [404, "Processo não encontrado na Sessão de julgamento"];
                }else return [404, "Sessão de julgamento não encontrada."];
            });

        this._fuseMockApiService
            .onGet('sessao-de-julgamento/:numeroAno/processos/:id')
            .reply(({urlParams}) => {
              const idProcesso = +urlParams.id;
              const numeroAno = urlParams['numeroAno'];

              let indexJulgamento = this._sessaoDeJulgamentos.findIndex(julg => {
                console.log(numeroAno);
                const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
                return sessaoNumeroAno === numeroAno;
              });

              if(indexJulgamento != -1){
                  let indexProcesso = this._sessaoDeJulgamentos[indexJulgamento].processos.findIndex(processo => processo.id === idProcesso);
                  if(indexProcesso != -1){
                    let processo = this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso];
                    console.log(processo);
                    return [201, processo];
                  } else return [404, "Processo não encontrado na Sessão de julgamento"];
              }else return [404, "Sessão de julgamento não encontrada."];
              
        });

        this._fuseMockApiService
            .onPost('sessao-de-julgamento/:numeroAno/processos/:id/vistas')
            .reply(({request, urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const numeroAno = urlParams['numeroAno'];
                const { body } = request;
                const m = ministro.find(({id}) => id === body.ministro);

                let indexJulgamento = this._sessaoDeJulgamentos.findIndex(julg => {
                    const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
                    return sessaoNumeroAno === numeroAno;
                  });
    
                if(indexJulgamento != -1){
                      let indexProcesso = this._sessaoDeJulgamentos[indexJulgamento].processos.findIndex(processo => processo.id === idProcesso);
                      if(indexProcesso != -1){
                        body.id = this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].vistas.length + 1;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].vistas.push({...body, ministro: m });
                        setStorage('sessoesDeJulgamento', this._sessaoDeJulgamentos);
                        return [201, this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].vistas[this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].vistas.length-1]];
                      } else return [404, "Processo não encontrado na Sessão de julgamento"];
                }else return [404, "Sessão de julgamento não encontrada."];
            });
        
        this._fuseMockApiService
            .onPost('sessao-de-julgamento/:numeroAno/processos/:id/finalizar-julgamento')
            .reply(({request, urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const numeroAno = urlParams['numeroAno'];
                const { body } = request;
                console.log("FINALIZAR PROCESSO");
                console.log(body);

                let indexJulgamento = this._sessaoDeJulgamentos.findIndex(julg => {
                    const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
                    return sessaoNumeroAno === numeroAno;
                  });
    
                if(indexJulgamento != -1){
                      let indexProcesso = this._sessaoDeJulgamentos[indexJulgamento].processos.findIndex(processo => processo.id === idProcesso);
                      if(indexProcesso != -1){
                        
                        return [201, "Julgamento finalizado com sucesso"];
                      } else return [404, "Processo não encontrado na Sessão de julgamento"];
                }else return [404, "Sessão de julgamento não encontrada."];
            });


        this._fuseMockApiService
            .onPut('sessao-de-julgamento/:numeroAno/processos/:id/vistas/:idVista')
            .reply(({request, urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const numeroAno = urlParams['numeroAno'];
                const idVista: number = +urlParams.idVista;
                const { body } = request;
                const m = ministro.find(({id}) => id === body.ministro);

                let indexJulgamento = this._sessaoDeJulgamentos.findIndex(julg => {
                    const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
                    return sessaoNumeroAno === numeroAno;
                });

                if(indexJulgamento != -1){
                      let indexProcesso = this._sessaoDeJulgamentos[indexJulgamento].processos.findIndex(processo => processo.id === idProcesso);
                      if(indexProcesso != -1){
                        let index_vista = this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].vistas.findIndex(vista => vista.id === idVista);
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].vistas[index_vista].data = body.data;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].vistas[index_vista].ministro = body.ministro;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].vistas[index_vista].processo = body.processo;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].vistas[index_vista].sessao = body.sessao;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].vistas[index_vista].texto = body.texto;
                        console.log("ATUALIZANDO VISTA...");
                        console.log(this._sessaoDeJulgamentos);
                        setStorage('sessoesDeJulgamento', this._sessaoDeJulgamentos);
                        return [201, this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].vistas[index_vista]];
                      } else return [404, "Processo não encontrado na Sessão de julgamento"];
                }else return [404, "Sessão de julgamento não encontrada."];
            });

        this._fuseMockApiService
            .onDelete('sessao-de-julgamento/:numeroAno/processos/:id/vistas/:idVista')
            .reply(({urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const numeroAno = urlParams['numeroAno'];
                const idVista: number = +urlParams.idVista;

                let indexJulgamento = this._sessaoDeJulgamentos.findIndex(julg => {
                    const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
                    return sessaoNumeroAno === numeroAno;
                });

                if(indexJulgamento != -1){
                      let indexProcesso = this._sessaoDeJulgamentos[indexJulgamento].processos.findIndex(processo => processo.id === idProcesso);
                      if(indexProcesso != -1){
                        let index_vista = this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].vistas.findIndex(vista => vista.id === idVista);
                        if(index_vista!=-1){
                            this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].vistas.splice(index_vista, 1);
                            setStorage('sessoesDeJulgamento', this._sessaoDeJulgamentos);
                            return [200, "Excluído com sucesso"];
                        } return [404, "Vista não encontrada"];
                      } else return [404, "Processo não encontrado na Sessão de julgamento"];
                }else return [404, "Sessão de julgamento não encontrada."];
            });

        this._fuseMockApiService
            .onPost('sessao-de-julgamento/:numeroAno/processos/:id/destaques')
            .reply(({request, urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const numeroAno = urlParams['numeroAno'];
                const { body } = request;
                const m = ministro.find(({id}) => id === body.ministro);


                let indexJulgamento = this._sessaoDeJulgamentos.findIndex(julg => {
                    const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
                    return sessaoNumeroAno === numeroAno;
                  });
    
                if(indexJulgamento != -1){
                      let indexProcesso = this._sessaoDeJulgamentos[indexJulgamento].processos.findIndex(processo => processo.id === idProcesso);
                      if(indexProcesso != -1){
                        body.id = this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].destaques.length + 1;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].destaques.push({...body, ministro: m });
                        setStorage('sessoesDeJulgamento', this._sessaoDeJulgamentos);
                        return [201, this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].destaques[this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].destaques.length-1]];
                      } else return [404, "Processo não encontrado na Sessão de julgamento"];
                }else return [404, "Sessão de julgamento não encontrada."];
            });

        this._fuseMockApiService
            .onPut('sessao-de-julgamento/:numeroAno/processos/:id/destaques/:idDestaque')
            .reply(({request, urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const numeroAno = urlParams['numeroAno'];
                const idDestaque: number = +urlParams.idDestaque;
                const { body } = request;
                const m = ministro.find(({id}) => id === body.ministro);

                let indexJulgamento = this._sessaoDeJulgamentos.findIndex(julg => {
                    const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
                    return sessaoNumeroAno === numeroAno;
                });

                if(indexJulgamento != -1){
                      let indexProcesso = this._sessaoDeJulgamentos[indexJulgamento].processos.findIndex(processo => processo.id === idProcesso);
                      if(indexProcesso != -1){
                        let index_destaque = this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].destaques.findIndex(destaque => destaque.id === idDestaque);
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].destaques[index_destaque].data = body.data;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].destaques[index_destaque].ministro = body.ministro;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].destaques[index_destaque].processo = body.processo;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].destaques[index_destaque].sessao = body.sessao;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].destaques[index_destaque].texto = body.texto;
                        setStorage('sessoesDeJulgamento', this._sessaoDeJulgamentos);
                        return [201, this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].destaques[index_destaque]];
                      } else return [404, "Processo não encontrado na Sessão de julgamento"];
                }else return [404, "Sessão de julgamento não encontrada."];
            });

        this._fuseMockApiService
            .onDelete('sessao-de-julgamento/:numeroAno/processos/:id/destaques/:idDestaque')
            .reply(({urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const numeroAno = urlParams['numeroAno'];
                const idDestaque: number = +urlParams.idDestaque;

                let indexJulgamento = this._sessaoDeJulgamentos.findIndex(julg => {
                    const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
                    return sessaoNumeroAno === numeroAno;
                });

                if(indexJulgamento != -1){
                      let indexProcesso = this._sessaoDeJulgamentos[indexJulgamento].processos.findIndex(processo => processo.id === idProcesso);
                      if(indexProcesso != -1){
                        let index_destaque = this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].destaques.findIndex(destaque => destaque.id === idDestaque);
                        if(index_destaque!=-1){
                            this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].destaques.splice(index_destaque, 1);
                            setStorage('sessoesDeJulgamento', this._sessaoDeJulgamentos);
                            return [200, "Excluído com sucesso"];
                        } return [404, "Vista não encontrada"];
                      } else return [404, "Processo não encontrado na Sessão de julgamento"];
                }else return [404, "Sessão de julgamento não encontrada."];
            });

        this._fuseMockApiService
            .onPost('sessao-de-julgamento/:numeroAno/processos/:id/impedimentos')
            .reply(({request, urlParams}) => {
                const idProcesso: number = +urlParams.id;
                const numeroAno = urlParams['numeroAno'];
                const { body } = request;

                
                let indexJulgamento = this._sessaoDeJulgamentos.findIndex(julg => {
                    const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
                    return sessaoNumeroAno === numeroAno;
                });

                if(indexJulgamento != -1){
                    let indexProcesso = this._sessaoDeJulgamentos[indexJulgamento].processos.findIndex(processo => processo.id === idProcesso);
                    if(indexProcesso!=-1){
                        const processo = this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso];
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
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso] = processo;
                        setStorage('sessoesDeJulgamento', this._sessaoDeJulgamentos);
                        return [200, processo];

                    } return [404, "Processo não encontrado na Sessão de julgamento"];
                }else return [404, "Sessão de julgamento não encontrada."];
            });

        this._fuseMockApiService
            .onGet('sessao-de-julgamento/:numeroAno/processos/:id/capitulos')
            .reply(({urlParams}) => {
              const idProcesso = +urlParams.id;
              const numeroAno = urlParams['numeroAno'];

              let indexJulgamento = this._sessaoDeJulgamentos.findIndex(julg => {
                const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
                return sessaoNumeroAno === numeroAno;
              });

              if(indexJulgamento != -1){
                   let indexProcesso = this._sessaoDeJulgamentos[indexJulgamento].processos.findIndex(processo => processo.id === idProcesso);
                   if(indexProcesso!= -1){
                        return [200, this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso]];
                   }return [404, "Processo não encontrado na Sessão de julgamento"];
              }else return [404, "Sessão de julgamento não encontrada."];
            });

        this._fuseMockApiService
            .onPost('sessao-de-julgamento/:numeroAno/processos/:id/capitulos')
            .reply(({request, urlParams}) => {
              const idProcesso = +urlParams.id;
              const { capitulo, processos_mesma_decisao } = request.body;
              const numeroAno = urlParams['numeroAno'];

              let indexJulgamento = this._sessaoDeJulgamentos.findIndex(julg => {
                const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
                return sessaoNumeroAno === numeroAno;
              });

              if(indexJulgamento != -1){
                   let indexProcesso = this._sessaoDeJulgamentos[indexJulgamento].processos.findIndex(processo => processo.id === idProcesso);
                   if(indexProcesso!= -1){
                    if (capitulo.id != null) {
                        const index_capitulo = this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].capitulos.findIndex(it => it.id === capitulo.id);
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].capitulos[index_capitulo].descricao = capitulo.descricao;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].capitulos[index_capitulo].dispositivo = capitulo.dispositivo;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].capitulos[index_capitulo].ministro_condutor = capitulo.ministro_condutor;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].capitulos[index_capitulo].ministros_acordam = capitulo.ministros_acordam;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].capitulos[index_capitulo].ministros_divergem = capitulo.ministros_divergem;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].capitulos[index_capitulo].processos_mesma_decisao = processos_mesma_decisao;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].capitulos[index_capitulo].sessao = capitulo.sessao;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].capitulos[index_capitulo].texto = capitulo.texto;
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].capitulos[index_capitulo].tipo = capitulo.tipo;
                    } else {
                        this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].capitulos.push({
                              ...capitulo,
                              id: this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].capitulos.length + 1,
                              processos_mesma_decisao: processos_mesma_decisao
                            });
                            
                     }
                    setStorage('sessoesDeJulgamento', this._sessaoDeJulgamentos);
                    return [201, this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso].capitulos];
                   }return [404, "Processo não encontrado na Sessão de julgamento"];
              }else return [404, "Sessão de julgamento não encontrada."];
            });

        this._fuseMockApiService
            .onDelete('sessao-de-julgamento/:numeroAno/processos/:id/capitulos/:idCapitulo')
            .reply(({request, urlParams}) => {
                const id_processo: number = +urlParams.id;
                const id_capitulo: number = +urlParams.idCapitulo;
                const numeroAno = urlParams['numeroAno'];
                let index_processo;
                let index_capitulo;

                let indexJulgamento = this._sessaoDeJulgamentos.findIndex(julg => {
                    const sessaoNumeroAno = `${julg.numero}-${julg.ano}`;
                    return sessaoNumeroAno === numeroAno;
                });
    
                if(indexJulgamento != -1){
                    let indexProcesso = this._sessaoDeJulgamentos[indexJulgamento].processos.findIndex(processo => processo.id === id_processo);
                    if(indexProcesso!= -1){
                            index_capitulo = this._sessaoDeJulgamentos[indexJulgamento].processos[index_processo].capitulos.findIndex(capitulo => capitulo.id === id_capitulo);
                            if(index_capitulo != -1){
                                this._sessaoDeJulgamentos[indexJulgamento].processos[index_processo].capitulos.splice(index_capitulo, 1);
                                setStorage('sessoesDeJulgamento', this._sessaoDeJulgamentos);
                                return [200, this._processos[index_processo].capitulos];
                            }
                            return [200, this._sessaoDeJulgamentos[indexJulgamento].processos[indexProcesso]];
                    }return [404, "Processo não encontrado na Sessão de julgamento"];
                }else return [404, "Sessão de julgamento não encontrada."];
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
