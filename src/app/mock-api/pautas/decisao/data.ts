import { Decisao } from "app/modules/acervo/model/interfaces/decisao.interface";
import { Processo } from "app/modules/acervo/model/interfaces/processo.interface";
import { SessaoJulgamento } from "app/modules/acervo/model/interfaces/sessao-julgamento.interface";
import { tags as tagData } from 'app/mock-api/pautas/tags/data';
import { TipoDoProcesso } from "app/modules/acervo/model/enums/tipoDoProcesso.enum";
import { TipoCapitulo } from "app/modules/acervo/model/enums/tipoCapitulo.enum";
import { ministro } from "../ministro/data";
import { processo } from "../processos/data";

export const decisoes: any[] = [
  {
    "decisoes": [
      {
        "capitulo": {
          "id": 1,
          "descricao": "string",
          "tipo": "Mérito",
          "ministros_acordam": [
            {
              "ministro": {
                "id": 12314441,
                "nome": "Luiz Fux",
                "abreviacao": "MLF",
                "cadeira": {
                  "numero": 19,
                  "ocupante": {
                    "id": 12314441,
                    "nome": "Luiz Fux",
                    "abreviacao": "MLF",
                    "cadeira": {
                      
                    }
                  }
                }
              }
            }
          ],
          "ministro_condutor": {
            "id": 12314441,
            "nome": "Luiz Fux",
            "abreviacao": "MLF",
            "cadeira": {
              "numero": 19,
              "ocupante": {
                "id": 12314441,
                "nome": "Luiz Fux",
                "abreviacao": "MLF",
                "cadeira": {
                  
                }
              }
            }
          },
          "texto": "string"
        },
        "processos_mesma_decisao": [
          {
            "id": 123455,
            "ementa": "Sessão de julgamento extraordinária para tratar da divisão de terras.",
            "lista": {
              "descricao": "Semelhante a ADI 100",
              "id": 123445,
              "gestor": {
                "numero": 19,
                "ocupante": {
                  "id": 12314441,
                  "nome": "Luiz Fux",
                  "abreviacao": "MLF",
                  "cadeira": {
                    "numero": 19,
                    "ocupante": {
                      "id": 12314441,
                      "nome": "Luiz Fux",
                      "abreviacao": "MLF",
                      "cadeira": {
                        
                      }
                    }
                  }
                }
              },
              "publica": false
            },
            "classe": "ADI",
            "numero": 100,
            "nome": "Agravo",
            "abreviacao": "Ag",
            "situacao": {
              "id": 1,
              "nome": "Apto a Julgar"
            },
            "tipo": "Merito",
            "relator": {
              "numero": 19,
              "ocupante": {
                "id": 12314441,
                "nome": "Luiz Fux",
                "abreviacao": "MLF",
                "cadeira": {
                  "numero": 19,
                  "ocupante": {
                    "id": 12314441,
                    "nome": "Luiz Fux",
                    "abreviacao": "MLF",
                    "cadeira": {
                      
                    }
                  }
                }
              }
            },
            "redator": {
              "numero": 19,
              "ocupante": {
                "id": 12314441,
                "nome": "Luiz Fux",
                "abreviacao": "MLF",
                "cadeira": {
                  "numero": 19,
                  "ocupante": {
                    "id": 12314441,
                    "nome": "Luiz Fux",
                    "abreviacao": "MLF",
                    "cadeira": {
                      
                    }
                  }
                }
              }
            },
            "capitulos": [
              {
                "id": 1,
                "descricao": "string",
                "tipo": "Mérito",
                "ministros_acordam": [
                  {
                    "ministro": {
                      "id": 12314441,
                      "nome": "Luiz Fux",
                      "abreviacao": "MLF",
                      "cadeira": {
                        "numero": 19,
                        "ocupante": {
                          "id": 12314441,
                          "nome": "Luiz Fux",
                          "abreviacao": "MLF",
                          "cadeira": {
                            
                          }
                        }
                      }
                    }
                  }
                ],
                "ministro_condutor": {
                  "id": 12314441,
                  "nome": "Luiz Fux",
                  "abreviacao": "MLF",
                  "cadeira": {
                    "numero": 19,
                    "ocupante": {
                      "id": 12314441,
                      "nome": "Luiz Fux",
                      "abreviacao": "MLF",
                      "cadeira": {
                        
                      }
                    }
                  }
                },
                "texto": "string"
              }
            ]
          }
        ]
      }
    ],
    "sessao": {
      "numero": 1000,
      "ano": 2021,
      "colegiado": {
        "nome": "Primeira turma",
        "presidente": {
          "id": 12314441,
          "nome": "Luiz Fux",
          "abreviacao": "MLF",
          "cadeira": {
            "numero": 19,
            "ocupante": {
              "id": 12314441,
              "nome": "Luiz Fux",
              "abreviacao": "MLF",
              "cadeira": {
                
              }
            }
          }
        },
        "composicao": [
          {
            "ministro": {
              "id": 12314441,
              "nome": "Luiz Fux",
              "abreviacao": "MLF",
              "cadeira": {
                "numero": 19,
                "ocupante": {
                  "id": 12314441,
                  "nome": "Luiz Fux",
                  "abreviacao": "MLF",
                  "cadeira": {
                    
                  }
                }
              }
            },
            "pode_votar": true,
            "votou": false
          }
        ]
      },
      "tipo": "ORDINARIA",
      "categoria": "REPERCUSSAO_GERAL",
      "modalidade": "VIRTUAL",
      "data-inicio": "2016-08-29T09:12:33.001Z",
      "data-fim": "2016-08-29T09:12:33.001Z",
      "secretario": {
        "id": 19,
        "nome": "Carmen"
      },
      "situacao": "PUBLICADA"
    }
  }
];