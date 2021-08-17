import { SituacaoDoProcesso } from "app/modules/acervo/model/enums/situacaoDoProcesso.enum";
import { TipoDoProcesso } from "app/modules/acervo/model/enums/tipoDoProcesso.enum";
import { Processo } from "app/modules/acervo/model/interfaces/processo.interface";
import { SessaoDeJulgamento } from "app/modules/acervo/model/interfaces/sessaoDeJulgamento.interface";
import { SessaoJulgamento } from "app/modules/services/julgamento.service";

export const julgamentos: SessaoJulgamento[] = [
  {
    observacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris laoreet sapien eget magna tristique, vel tristique nibh sollicitudin. Sed vestibulum sapien a magna congue lobortis. Nulla sagittis sem vitae odio feugiat, a hendrerit turpis pulvinar. Nullam sit amet nisl quis velit sollicitudin consequat. In tristique vitae justo eu malesuada. Praesent volutpat dictum tristique. Donec vehicula, ante in dignissim consequat, lacus mi porttitor sem, sit amet placerat urna tortor sed ligula. Vivamus varius quis leo sit amet fermentum. In tristique venenatis maximus. Nam risus elit, vestibulum vel mollis dictum, varius quis tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique eu eros quis fringilla. Maecenas volutpat, nisl at congue mollis, sem mauris convallis felis, nec auctor mauris massa et nunc. Nulla non condimentum dui, at congue risus. Vivamus et semper tortor, sit amet vehicula orci. Pellentesque auctor orci sed tincidunt fermentum.',
    ministro: {
      id: 1,
      nome: 'Ministro X',
      abreviacao: 'MX',
      cadeira: {
        criacao: '2021-08-02T03:00:00.000Z',
        numero: 100,
      },
    },
    sessao: {
      id: 1,
      numero: 1000,
      ano: 2021,
      colegiado: "Primeira turma",
      tipo: "ORDINARIA",
      categoria: "REPERCUSSAO_GERAL",
      modalidade: "VIRTUAL",
      data_inicio: '2016-08-29T09:12:33.001Z',
      data_fim: '2016-08-29T09:12:33.001Z',
      secretario: {
        id: 19,
        nome: "Ministro Gilmar Mendes",
      },
      situacao: "PUBLICADA",
    },
  }
];

export const processos: Processo[] = [
  {
    id: 123455,
    ementa: "Sessão de julgamento extraordinária para tratar da divisão de terras.",
    lista: [{
      descricao: "Semelhante a ADI 100",
      id: 123445,
      gestor: {
        numero: 19,
        ocupante: {
          id: 12314441,
          nome: "Luiz Fux",
          abreviacao: "MLF",
          cadeira: {
            criacao: '2021-08-02T03:00:00.000Z',
            numero: 100,
          }
        },
        criacao: "2016-08-29T09:12:33.001Z",
      },
      publica: false
    }],
    classe: "ADI",
    numero: 100,
    nome: "Embargo de declaração",
    situacao: SituacaoDoProcesso.Pautado,
    tipo: TipoDoProcesso.Merito,
    relator: {
      numero: 19,
      ocupante: {
        id: 12314441,
        nome: "Luiz Fux",
        abreviacao: "MLF",
        cadeira: {
            criacao: '2021-08-02T03:00:00.000Z',
            numero: 100,
          }
      },
      criacao: "2016-08-29T09:12:33.001Z"
    },
    redator: {
      numero: 19,
      ocupante: {
        id: 12314441,
        nome: "Luiz Fux",
        abreviacao: "MLF",
        cadeira: {
            criacao: '2021-08-02T03:00:00.000Z',
            numero: 100,
          }
      },
      criacao: "2016-08-29T09:12:33.001Z"
    },
    capitulos: [
      {
        id: 123455,
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus omnis eum ratione, impedit, consequuntur laborum amet tempore iure accusamus in nulla voluptates odit. Eum fugit eius, assumenda distinctio quidem quia?",
        ordem: 1,
        tipo: "Mérito"
      }
    ]
  },

  {
    id: 123455,
    ementa: "Sessão de julgamento extraordinária para tratar da divisão de terras.",
    lista: [{
      descricao: "Semelhante a ADI 100",
      id: 123445,
      gestor: {
        numero: 19,
        ocupante: {
          id: 12314441,
          nome: "Luiz Fux",
          abreviacao: "MLF",
          cadeira: {
            criacao: '2021-08-02T03:00:00.000Z',
            numero: 100,
          }
        },
        criacao: "2016-08-29T09:12:33.001Z",
      },
      publica: false
    }],
    classe: "ADI",
    numero: 100,
    nome: "Embargo de declaração",
    situacao: SituacaoDoProcesso.Pautado,
    tipo: TipoDoProcesso.Merito,
    relator: {
      numero: 19,
      ocupante: {
        id: 12314441,
        nome: "Luiz Fux",
        abreviacao: "MLF",
        cadeira: {
            criacao: '2021-08-02T03:00:00.000Z',
            numero: 100,
          }
      },
      criacao: "2016-08-29T09:12:33.001Z"
    },
    redator: {
      numero: 19,
      ocupante: {
        id: 12314441,
        nome: "Luiz Fux",
        abreviacao: "MLF",
        cadeira: {
            criacao: '2021-08-02T03:00:00.000Z',
            numero: 100,
          }
      },
      criacao: "2016-08-29T09:12:33.001Z"
    },
    capitulos: [
      {
        id: 123455,
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus omnis eum ratione, impedit, consequuntur laborum amet tempore iure accusamus in nulla voluptates odit. Eum fugit eius, assumenda distinctio quidem quia?",
        ordem: 1,
        tipo: "Mérito"
      }
    ]
  },
]