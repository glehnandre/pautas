import { SituacaoDoProcesso } from 'app/modules/acervo/model/enums/situacaoDoProcesso.enum';
import { TipoDoProcesso } from 'app/modules/acervo/model/enums/tipoDoProcesso.enum';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';
import { ministro } from '../ministro/data';

export const julgamentos: SessaoJulgamento[] = [
  {
      numero: 1000,
      ano: 2021,
      colegiado: 'Primeira turma',
      tipo: 'ORDINARIA',
      categoria: 'REPERCUSSAO_GERAL',
      modalidade: 'VIRTUAL',
      data_inicio: '2016-08-29T09:12:33.001Z',
      data_fim: '2016-08-29T09:12:33.001Z',
      secretario: {
        id: 19,
        nome: 'Beatriz Cunha',
      },
      situacao: 'ABERTA',
  },
  {
    ano: 2021,
    numero: 1,
    colegiado: 'Primeira Turma',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-06-29T09:12:33.001Z',
    data_fim: '2021-12-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
  {
    ano: 2021,
    numero: 2,
    colegiado: 'Primeira Turma',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-06-29T09:12:33.001Z',
    data_fim: '2021-12-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
  {
    ano: 2021,
    numero: 3,
    colegiado: 'Segunda Turma',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-04-29T09:12:33.001Z',
    data_fim: '2021-11-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
  {
    ano: 2021,
    numero: 4,
    colegiado: 'Segunda Turma',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-04-29T09:12:33.001Z',
    data_fim: '2021-11-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
  {
    ano: 2021,
    numero: 5,
    colegiado: 'Segunda Turma',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-03-29T09:12:33.001Z',
    data_fim: '2021-10-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
  {
    ano: 2021,
    numero: 6,
    colegiado: 'Segunda Turma',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-03-29T09:12:33.001Z',
    data_fim: '2021-10-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
  {
    ano: 2021,
    numero: 7,
    colegiado: 'Segunda Turma',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-03-29T09:12:33.001Z',
    data_fim: '2021-10-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
  {
    ano: 2021,
    numero: 8,
    colegiado: 'Pleno',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-07-29T09:12:33.001Z',
    data_fim: '2021-10-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
  {
    ano: 2021,
    numero: 9,
    colegiado: 'Pleno',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-01-29T09:12:33.001Z',
    data_fim: '2021-12-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
  {
    ano: 2021,
    numero: 10,
    colegiado: 'Pleno',
    modalidade: 'Virtual',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-09-29T09:12:33.001Z',
    data_fim: '2021-12-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
  {
    ano: 2021,
    numero: 11,
    colegiado: 'Primeira Turma',
    modalidade: 'Presencial',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-06-29T09:12:33.001Z',
    data_fim: '2021-12-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
  {
    ano: 2021,
    numero: 12,
    colegiado: 'Primeira Turma',
    modalidade: 'Presencial',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-06-29T09:12:33.001Z',
    data_fim: '2021-12-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
  {
    ano: 2021,
    numero: 13,
    colegiado: 'Segunda Turma',
    modalidade: 'Presencial',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-04-29T09:12:33.001Z',
    data_fim: '2021-11-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
  {
    ano: 2021,
    numero: 14,
    colegiado: 'Segunda Turma',
    modalidade: 'Presencial',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-04-29T09:12:33.001Z',
    data_fim: '2021-11-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
  {
    ano: 2021,
    numero: 15,
    colegiado: 'Pleno',
    modalidade: 'Presencial',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-03-29T09:12:33.001Z',
    data_fim: '2021-10-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
  {
    ano: 2021,
    numero: 16,
    colegiado: 'Pleno',
    modalidade: 'Presencial',
    categoria: 'Judicial',
    tipo: 'Ordinária',
    data_inicio: '2021-03-29T09:12:33.001Z',
    data_fim: '2021-10-29T09:12:33.001Z',
    situacao: 'ABERTA'
  },
];

export const processos: Processo[] = [
  {
    id: 123455,
    ementa: 'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    lista: [{
      descricao: 'Semelhante a ADI 100',
      id: 123445,
      publica: false
    }],
    classe: 'ADI',
    numero: 100,
    nome: 'Embargo de declaração',
    situacao: SituacaoDoProcesso.Pautado,
    tipo: TipoDoProcesso.Merito,
    relator: ministro[10],
    redator: ministro[10],
    capitulos: [
      {
        id: 123455,
        descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus omnis eum ratione, impedit, consequuntur laborum amet tempore iure accusamus in nulla voluptates odit. Eum fugit eius, assumenda distinctio quidem quia?',
        ordem: 1,
        tipo: 'Mérito',
        dispositivo: 'Deferido',
      },
    ]
  },

  {
    id: 123455,
    ementa: 'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    lista: [{
      descricao: 'Semelhante a ADI 100',
      id: 123445,
      gestor: {
          numero: 19,
          criacao: '2021-08-02T03:00:00.000Z',
      },
      publica: false
    }],
    classe: 'ADI',
    numero: 100,
    nome: 'Embargo de declaração',
    situacao: SituacaoDoProcesso.Pautado,
    tipo: TipoDoProcesso.Merito,
    relator: ministro[10],
    redator: ministro[10],
    capitulos: [
      {
        id: 123455,
        descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus omnis eum ratione, impedit, consequuntur laborum amet tempore iure accusamus in nulla voluptates odit. Eum fugit eius, assumenda distinctio quidem quia?',
        ordem: 1,
        tipo: 'Mérito',
        dispositivo: 'Deferido'
      }
    ]
  },
]
;
