import { Ata } from "app/modules/acervo/model/interfaces/ata.interface";
import { Decisao, DecisoesResultadoJulgamento } from "app/modules/acervo/model/interfaces/decisao.interface";
import { Processo } from "app/modules/acervo/model/interfaces/processo.interface";
import { SessaoJulgamento } from "app/modules/acervo/model/interfaces/sessao-julgamento.interface";

import { capitulo } from "../capitulo/data"
import { ministro } from "../ministro/data";
import { processo } from "../processos/data";
import { sessao } from "../sessoes-julgamento/data";

export const decisoes: Array<DecisoesResultadoJulgamento> = [
  {
    decisoes: [
      {
        capitulo: {
          descricao: '',
          dispositivo: '',
          ministro_condutor: '',
          ministros_acordam: [
            ministro[0],
            ministro[1],
            ministro[2],
            ministro[3],
            ministro[4],
            ministro[5],
          ],
          texto: '',
          tipo: '',
        },
        processos_mesma_decisao: [
          processo[0],
          processo[1],
          processo[2],
        ],
      }
    ],
    sessao: sessao[0],
  }
];

export const ata: Ata = {
    total_julgados: 3,
    total_vista: 5,
    total_destaque: 0,
    total_nao_julgados: 1,
    total_suspensos: 1,
    sessao: sessao[0],
    capitulos_para_publicacao: [
      {
        classe: "ARE",
        classe_extenso: "RECURSO EXTRAORDINÁRIO COM AGRAVO",
        numero: "1311742",
        cadeia: "string",
        envolvidos: [
          {
            nome: "Instituto Nacional do Seguro Social",
            polo: "REQUERENTE",
            categoria: "REQUERENTE",
            identificacoes: [],
          },
          {
            nome: "Francisco Chagas Ferreira Lima",
            polo: "RECORRIDO",
            categoria: "RECORRIDO",
            identificacoes: [],
          },
          {
            nome: "Andrea Ponte Barbosa",
            polo: "REQUERENTE",
            categoria: "ADVOGADA",
            identificacoes: ["OAB 13190-B/CE"],
          },
          {
            nome: "Geissa Braga Calvacante",
            polo: "RECORRIDO",
            categoria: "ADVOGADA",
            identificacoes: [
              "OAB 12314-B/CE",
            ],
          },
          {
            nome: "Andrea Ponte Barbosa",
            polo: "RECORRIDO",
            categoria: "ADVOGADA",
            identificacoes: [
              "OAB 56782-B/CE",
            ],
          },
        ],
        relator: ministro[0],
        redator: ministro[1],
        ministros_impedidos: [
          ministro[2],
        ],
        ministros_suspeitos: [
          ministro[3],
          ministro[4],
        ],
        capitulos: [
          capitulo[0],
          capitulo[1],
        ]
      },
      {
        classe: "AG",
        classe_extenso: "AGRAVO REGIMENTAL",
        numero: "100",
        cadeia: "string",
        envolvidos: [
          {
            nome: "Instituto Nacional do Seguro Social",
            polo: "REQUERENTE",
            categoria: "REQUERENTE",
            identificacoes: [],
          },
          {
            nome: "Francisco Chagas Ferreira Lima",
            polo: "RECORRIDO",
            categoria: "RECORRIDO",
            identificacoes: [],
          },
          {
            nome: "Andrea Ponte Barbosa",
            polo: "REQUERENTE",
            categoria: "ADVOGADA",
            identificacoes: ["OAB 13190-B/CE"],
          },
          {
            nome: "Geissa Braga Calvacante",
            polo: "RECORRIDO",
            categoria: "ADVOGADA",
            identificacoes: [
              "OAB 12314-B/CE",
            ],
          },
          {
            nome: "Andrea Ponte Barbosa",
            polo: "RECORRIDO",
            categoria: "ADVOGADA",
            identificacoes: [
              "OAB 56782-B/CE",
            ],
          },
        ],
        relator: ministro[1],
        redator: ministro[9],
        ministros_impedidos: [
          ministro[0],
        ],
        ministros_suspeitos: [
          ministro[0],
        ],
        capitulos: [
          capitulo[2],
          capitulo[3],
          capitulo[4],
        ]
      },
      {
        classe: "CCP",
        classe_extenso: "CLASSE DE CAPITULO PARA PUBLICACAO",
        numero: "numero",
        cadeia: "cadeia",
        envolvidos: [
          {
            nome: "Instituto Nacional do Seguro Social",
            polo: "REQUERENTE",
            categoria: "REQUERENTE",
            identificacoes: [],
          },
          {
            nome: "Francisco Chagas Ferreira Lima",
            polo: "RECORRIDO",
            categoria: "RECORRIDO",
            identificacoes: [],
          },
          {
            nome: "Andrea Ponte Barbosa",
            polo: "REQUERENTE",
            categoria: "ADVOGADA",
            identificacoes: ["OAB 13190-B/CE"],
          },
          {
            nome: "Geissa Braga Calvacante",
            polo: "RECORRIDO",
            categoria: "ADVOGADA",
            identificacoes: [
              "OAB 12314-B/CE",
            ],
          },
          {
            nome: "Andrea Ponte Barbosa",
            polo: "RECORRIDO",
            categoria: "ADVOGADA",
            identificacoes: [
              "OAB 56782-B/CE",
            ],
          },
        ],
        relator: ministro[2],
        redator: ministro[8],
        ministros_impedidos: [
          ministro[0],
        ],
        ministros_suspeitos: [
          ministro[0],
        ],
        capitulos: [
          capitulo[5],
        ]
      }
    ]
  }
