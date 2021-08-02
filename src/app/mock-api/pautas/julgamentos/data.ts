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