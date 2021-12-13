import { SituacaoDoProcesso } from "app/modules/acervo/model/enums/situacaoDoProcesso.enum";
import { TipoCapitulo } from "app/modules/acervo/model/enums/tipoCapitulo.enum";
import { TipoDoProcesso } from "app/modules/acervo/model/enums/tipoDoProcesso.enum";
import { Processo } from "app/modules/acervo/model/interfaces/processo.interface";
import { SessaoJulgamento } from "app/modules/acervo/model/interfaces/sessao-julgamento.interface";
import { ministro } from "../ministro/data";


export const sessao: SessaoJulgamento[] = [
  {
    id: 0,
    numero: 1000,
    ano: 2021,
    colegiado: '',
    tipo: "ORDINARIA",
    categoria: "REPERCUSSAO_GERAL",
    modalidade: "VIRTUAL",
    data_inicio: "2016-08-29T09:12:33.001Z",
    data_fim: "2016-08-29T09:12:33.001Z",
    secretario: {
      id: 19,
      nome: "Carmén Lillian"
    },
    situacao: "PUBLICADA",
    ministros_presentes: [
      ministro[2],
      ministro[6],
      ministro[7],
      ministro[0],
      ministro[1],
      ministro[3],
      ministro[4],
      ministro[8],
      ministro[5],
      ministro[9],
    ],
    ministros_ausentes: [
      ministro[10],
    ],
    presidencia: ministro[0]
  }
];



export const processos: Processo[] = [
  {
    id: 123455,
    abreviacao: '',
    id_tipo_recurso: 1,
    ementa: "Sessão de julgamento extraordinária para tratar da divisão de terras.",
    lista: [{
      descricao: "Semelhante a ADI 100",
      id: 123445,
      gestor: {
        numero: 19,
        criacao: "2016-08-29T09:12:33.001Z",
      },
      publica: false
    }],
    classe: "ADI",
    numero: 100,
    nome: "Embargo de declaração",
    situacao: SituacaoDoProcesso.Pautado,
    tipo: TipoDoProcesso.Merito,
    relator: ministro[0],
    redator: ministro[1],
    capitulos: [
      {
        id: 1,
        tipo: TipoCapitulo.Modulacao,
        descricao: 'Descrição do capítulo',
        dispositivo: { id:0, nome: '', sentido: 'Positivo' },
        ministro_condutor: ministro[6],
        ministros_acordam: [
          ministro[0],
          ministro[1],
          ministro[2],
          ministro[3],
          ministro[4],
          ministro[5],
        ],
        ministros_divergem: [
          ministro[7],
        ],
        texto: 'Texto do capítulo',
      }
    ]
  },
]

