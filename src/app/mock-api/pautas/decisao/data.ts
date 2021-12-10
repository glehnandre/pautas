import { Ata } from "app/modules/acervo/model/interfaces/ata.interface";
import { DecisoesResultadoJulgamento } from "app/modules/acervo/model/interfaces/decisao.interface";
import { TipoCapitulo } from "app/modules/acervo/model/enums/tipoCapitulo.enum";
import { ModeloDecisao } from "app/modules/acervo/model/interfaces/modeloDecisao.interface";
import { dispositivos } from "../dispositivo/data";
import { capitulo } from "../capitulo/data"
import { ministro } from "../ministro/data";
import { sessao } from "../sessoes-julgamento/data";
import { processo } from "../processos/data";

export const decisoes: DecisoesResultadoJulgamento[] = [
  {
    decisoes: [
      {
        capitulo: capitulo[0],
        processos_mesma_decisao: [
          processo[0],
          processo[1],
        ],
        ministros_impedidos: [
          ministro[0],
          ministro[1],
          ministro[2],
        ],
        ministros_suspeitos: [
          ministro[3],
          ministro[4],
          ministro[5],
        ],
        vistas: [
          {
            id: 1,
            data: '2016-08-29T09:12:33.001Z',
            processo: 1231,
            ministro: 12313,
            sessao: 123,
            texto: "Após o voto do Ministro Marco Aurélio, Relator, que implementava a ordem, pediu vista dos autos o Ministro Alexandre de Moraes. Primeira Turma, Sessão Virtual de 13.11.2020 a 20.11.2020."
          }
        ],
        destaques: [
          {
            id: 1,
            data: '2016-08-29T09:12:33.001Z',
            processo: 1231,
            ministro: 12313,
            sessao: 123,
            texto: "Após o voto do Ministro Marco Aurélio, Relator, que implementava a ordem, pediu destaque do processo do plenário virtual."
          }
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
            identificacoes: [
              "OAB 13190-B/CE",
              "RG 12345-6",
            ],
          },
          {
            nome: "Geissa Braga Calvacante",
            polo: "RECORRIDO",
            categoria: "ADVOGADA",
            identificacoes: [
              "OAB 12314-B/CE",
              "RG 12345-6",
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
        processo: 0,
        capitulos: [
          capitulo[0],
          capitulo[1],
        ],
        destaques: [
          {
            id: 1,
            ministro: 1,
            processo: 1,
            sessao: 1,
            data: "2016-08-29T09:12:33.001Z",
            texto: "Após o voto do Ministro Marco Aurélio, Relator, que implementava a ordem, pediu destaque do processo do plenário virtual.",
          },
        ],
        vistas: [
          {
            id: 1,
            ministro: 1,
            processo: 1,
            sessao: 1,
            data: "2016-08-29T09:12:33.001Z",
            texto: "Após o voto do Ministro Marco Aurélio, Relator, que implementava a ordem, pediu vista dos autos o Ministro Alexandre de Moraes. Primeira Turma, Sessão Virtual de 13.11.2020 a 20.11.2020.",
          },
        ],
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
        processo: 1,
        capitulos: [
          capitulo[2],
          capitulo[3],
          capitulo[4],
        ],
        destaques: [
          {
            id: 1,
            ministro: 1,
            processo: 1,
            sessao: 1,
            data: "2016-08-29T09:12:33.001Z",
            texto: "Após o voto do Ministro Marco Aurélio, Relator, que implementava a ordem, pediu destaque do processo do plenário virtual.",
          },
        ],
        vistas: [
          {
            id: 1,
            ministro: 1,
            processo: 1,
            sessao: 1,
            data: "2016-08-29T09:12:33.001Z",
            texto: "Após o voto do Ministro Marco Aurélio, Relator, que implementava a ordem, pediu vista dos autos o Ministro Alexandre de Moraes. Primeira Turma, Sessão Virtual de 13.11.2020 a 20.11.2020.",
          },
        ],
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
        processo: 2,
        capitulos: [
          capitulo[5],
        ],
        destaques: [
          {
            id: 1,
            ministro: 1,
            processo: 1,
            sessao: 1,
            data: "2016-08-29T09:12:33.001Z",
            texto: "Após o voto do Ministro Marco Aurélio, Relator, que implementava a ordem, pediu destaque do processo do plenário virtual.",
          },
        ],
        vistas: [
          {
            id: 1,
            ministro: 1,
            processo: 1,
            sessao: 1,
            data: "2016-08-29T09:12:33.001Z",
            texto: "Após o voto do Ministro Marco Aurélio, Relator, que implementava a ordem, pediu vista dos autos o Ministro Alexandre de Moraes. Primeira Turma, Sessão Virtual de 13.11.2020 a 20.11.2020.",
          },
        ],
      },
    ],
  }

export const modeloDecisao: ModeloDecisao[] = [
  {
    id: 1,
    classe: 'ADI',
    dispositivo: dispositivos[0],
    recurso: 1,
    texto: 'Após o voto do Ministro relator @relator que dava provimento ao recurso extraordinário, de modo a conceder a segurança, e fixava a seguinte teste (tema 1.2021 de repercussão geral).',
    tipoCapitulo: TipoCapitulo.Merito,
  }
];
