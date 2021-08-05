import { SessaoDeJulgamento } from "app/modules/acervo/model/interfaces/sessaoDeJulgamento.interface";

export const julgamentos: SessaoDeJulgamento[] = [
  {
    id: 1,
    numero: 1000,
    ano: 2021,
    colegiado: "Primeira turma",
    tipo: "ORDINARIA",
    categoria: "REPERCUSSAO_GERAL",
    modalidade: "VIRTUAL",
    data_inicio: new Date(2021, 7, 1),
    data_fim: new Date(2021, 8, 1),
    secretario: {
      id: 19,
      nome: "Carmen",
    },
  },
];

export const processos: any[] = [
  {
    id: 123455,
    ementa: "Sessão de julgamento extraordinária para tratar da divisão de terras.",
    lista: {
      descricao: "Semelhante a ADI 100",
      id: 123445,
      gestor: {
        numero: 19,
        ocupante: {
          id: 12314441,
          nome: "Luiz Fux",
          abreviacao: "MLF",
          cadeira: "string"
        },
        criação: "2016-08-29T09:12:33.001Z",
      },
      publica: false
    },
    classe: "ADI",
    numero: 100,
    nome: "Embargo de declaração",
    situacao: {
      id: 1,
      nome: "Apto a Julgar"
    },
    tipo: "Merito",
    relator: {
      numero: 19,
      ocupante: {
        id: 12314441,
        nome: "Luiz Fux",
        abreviacao: "MLF",
        cadeira: "string"
      },
      criação: "2016-08-29T09:12:33.001Z"
    },
    redator: {
      numero: 19,
      ocupante: {
        id: 12314441,
        nome: "Luiz Fux",
        abreviacao: "MLF",
        cadeira: "string"
      },
      criação: "2016-08-29T09:12:33.001Z"
    },
    capitulos: [
      {
        id: 123455,
        descricao: "",
        ordem: 1,
        tipo: "Mérito"
      }
    ]
  }
]