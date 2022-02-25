import { SituacaoDoProcesso } from "app/shared/model/enums/situacaoDoProcesso.enum";
import { TipoDoProcesso } from "app/shared/model/enums/tipoDoProcesso.enum";
import { Ata } from "app/shared/model/interfaces/ata.interface";
import { Envolvido } from "app/shared/model/interfaces/capitulo.interface";
import { Processo } from "app/shared/model/interfaces/processo.interface";
import { Secretario } from "app/shared/model/interfaces/secretario.interface";
import { SessaoDeJulgamento } from "app/shared/model/interfaces/sessao-julgamento.interface";
import { Suspensao } from "app/shared/model/interfaces/suspensao.interface";
import { capitulo } from "../capitulo/data";
import { ministro } from '../ministro/data';
import { processo } from '../processos/data';
import { getStorage } from "../storage";

export const atas: Ata[] = getStorage('atas', [
  {
    cabecalho: `Isto é uma demonstração de como será exibido
        o cabeçalho de Revisar Extrato da Ata, para colocar o
        seu próprio cabeçalho, por favor conclua o formulário
        Finalizar Sessão de Julgamento`,
    outros_presentes: 'André Von Glehn',
    total_destaque: 0,
    total_julgados: 3,
    total_nao_julgados: 1,
    total_vista: 4,
    total_suspensos: 1,
    ministros_presentes: [ministro[1]],
    ministros_ausentes: [ministro[2]],
    presidencia:  ministro[0]
  }
]);

export const secretarios: Secretario[] = getStorage('secretarios', [
  {
    id: 1,
    nome: 'Carmen Lilian Oliveira de Souza',
  },
  {
    id: 2,
    nome: 'André von Glehn',
  },
  {
    id: 3,
    nome: 'Maria Silvia Marques dos Santos',
  },
  {
    id: 4,
    nome: 'Luiz Gustavo Silva Almeida',
  },
]);

export const sessoesDeJulgamento: SessaoDeJulgamento[] = getStorage('sessoesDeJulgamento', [
  {
    id: 123,
    numero: 1000,
    ano: 2021,
    colegiado: 'Primeira turma',
    tipo: 'ORDINARIA',
    categoria: 'Judicial',
    modalidade: 'VIRTUAL',
    data_inicio: '2016-08-29T09:12:33.001Z',
    data_fim: '2016-08-30T09:12:33.001Z',
    situacao: 'ABERTA',
    secretario: null,
    ata: atas[0],
    processos: [processo[8], processo[1]]
  },
  {
    ano: 2021,
    id: 1,
    numero: 1,
    colegiado: 'Primeira Turma',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-06-29T09:12:33.001Z',
    data_fim: '2021-12-29T09:12:33.001Z',
    situacao: 'ABERTA',
    secretario: {
      id: 0,
      nome: 'Beatriz Cunha',
    },
    presidencia: ministro[0],
    ata: atas[0],
    processos: []
  },
  {
    ano: 2021,
    id: 2,
    numero: 2,
    colegiado: 'Primeira Turma',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-06-29T09:12:33.001Z',
    data_fim: '2021-12-29T09:12:33.001Z',
    situacao: 'ABERTA',
    secretario: {
      id: 0,
      nome: 'Beatriz Cunha',
    },
    presidencia: ministro[0],
    ata: atas[0],
    processos: []
  },
  {
    ano: 2021,
    id: 3,
    numero: 3,
    colegiado: 'Segunda Turma',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-04-29T09:12:33.001Z',
    data_fim: '2021-11-29T09:12:33.001Z',
    situacao: 'ABERTA',
    secretario: {
      id: 0,
      nome: 'Beatriz Cunha',
    },
    presidencia: ministro[0],
    ata: atas[0],
    processos: []
  },
  {
    ano: 2021,
    id: 4,
    numero: 4,
    colegiado: 'Segunda Turma',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-04-29T09:12:33.001Z',
    data_fim: '2021-11-29T09:12:33.001Z',
    situacao: 'ABERTA',
    secretario: {
      id: 0,
      nome: 'Beatriz Cunha',
    },
    presidencia: ministro[0],
    ata: atas[0],
    processos: []
  },
  {
    ano: 2021,
    id: 5,
    numero: 5,
    colegiado: 'Segunda Turma',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-03-29T09:12:33.001Z',
    data_fim: '2021-10-29T09:12:33.001Z',
    situacao: 'ABERTA',
    secretario: {
      id: 0,
      nome: 'Beatriz Cunha',
    },
    presidencia: ministro[0],
    ata: atas[0],
    processos: []
  },
  {
    ano: 2021,
    id: 6,
    numero: 6,
    colegiado: 'Segunda Turma',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-03-29T09:12:33.001Z',
    data_fim: '2021-10-29T09:12:33.001Z',
    situacao: 'ABERTA',
    secretario: {
      id: 0,
      nome: 'Beatriz Cunha',
    },
    presidencia: ministro[0],
    ata: atas[0],
    processos: []
  },
  {
    ano: 2021,
    id: 7,
    numero: 7,
    colegiado: 'Segunda Turma',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-03-29T09:12:33.001Z',
    data_fim: '2021-10-29T09:12:33.001Z',
    situacao: 'ABERTA',
    secretario: {
      id: 0,
      nome: 'Beatriz Cunha',
    },
    presidencia: ministro[0],
    ata: atas[0],
    processos: []
  },
  {
    ano: 2021,
    id: 8,
    numero: 8,
    colegiado: 'Pleno',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-07-29T09:12:33.001Z',
    data_fim: '2021-10-29T09:12:33.001Z',
    situacao: 'ABERTA',
    secretario: {
      id: 0,
      nome: 'Beatriz Cunha',
    },
    presidencia: ministro[0],
    ata: atas[0],
    processos: []
  },
  {
    ano: 2021,
    id: 9,
    numero: 9,
    colegiado: 'Pleno',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-01-29T09:12:33.001Z',
    data_fim: '2021-12-29T09:12:33.001Z',
    situacao: 'ABERTA',
    secretario: {
      id: 0,
      nome: 'Beatriz Cunha',
    },
    presidencia: ministro[0],
    ata: atas[0],
    processos: []
  },
  {
    ano: 2021,
    id: 10,
    numero: 10,
    colegiado: 'Pleno',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-09-29T09:12:33.001Z',
    data_fim: '2021-12-29T09:12:33.001Z',
    situacao: 'ABERTA',
    secretario: {
      id: 0,
      nome: 'Beatriz Cunha',
    },
    presidencia: ministro[0],
    ata: atas[0]
  },
  {
    ano: 2021,
    id: 11,
    numero: 11,
    colegiado: 'Primeira Turma',
    modalidade: 'Presencial',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-06-29T09:12:33.001Z',
    data_fim: '2021-12-29T09:12:33.001Z',
    situacao: 'ABERTA',
    secretario: {
      id: 0,
      nome: 'Beatriz Cunha',
    },
    presidencia: ministro[0],
    ata: atas[0]
  },
  {
    ano: 2021,
    id: 12,
    numero: 12,
    colegiado: 'Primeira Turma',
    modalidade: 'Presencial',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-06-29T09:12:33.001Z',
    data_fim: '2021-12-29T09:12:33.001Z',
    situacao: 'ABERTA',
    secretario: {
      id: 0,
      nome: 'Beatriz Cunha',
    },
    presidencia: ministro[0],
    ata: atas[0]
  },
  {
    ano: 2021,
    id: 13,
    numero: 13,
    colegiado: 'Segunda Turma',
    modalidade: 'Presencial',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-04-29T09:12:33.001Z',
    data_fim: '2021-11-29T09:12:33.001Z',
    situacao: 'ABERTA',
    secretario: {
      id: 0,
      nome: 'Beatriz Cunha',
    },
    presidencia: ministro[0],
    ata: atas[0]
  },
]);

export const envolvidos: Envolvido[] = [
    {
      nome: "Instituto Nacional do Seguro Social",
      polo: "ATIVO",
      categoria: "REQUERENTE",
      identificacoes: [],
    },
    {
      nome: "Francisco Chagas Ferreira Lima",
      polo: "PASSIVO",
      categoria: "RECORRIDO",
      identificacoes: [],
    },
    {
      nome: "Andrea Ponte Barbosa",
      polo: "ATIVO",
      categoria: "ADVOGADA",
      identificacoes: [
        "OAB 13190-B/CE",
        "RG 12345-6",
      ],
    },
    {
      nome: "Geissa Braga Calvacante",
      polo: "PASSIVO",
      categoria: "ADVOGADA",
      identificacoes: [
        "OAB 12314-B/CE",
        "RG 12345-6",
      ],
    },
];
