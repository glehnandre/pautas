import { SituacaoDoProcesso } from 'app/modules/acervo/model/enums/situacaoDoProcesso.enum';
import { TipoDoProcesso } from 'app/modules/acervo/model/enums/tipoDoProcesso.enum';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { SessaoDeJulgamento } from 'app/modules/acervo/model/interfaces/sessaoDeJulgamento.interface';
import { JulgamentoService } from 'app/modules/services/julgamento.service';

export const sessao: SessaoDeJulgamento[] = [
  {
    id:1,
    numero: 1000,
    ano: 2021,
    colegiado: {
      nome: 'Primeira turma',
      presidente: {
        id: 12314441,
        nome: 'Luiz Fux',
        imagem: 'string',
        abreviacao: 'MLF',
        cadeira: 'string'
      },
      composicao: [
        {
          ministro: {
            id: 12314441,
            nome: 'Luiz Fux',
            imagem: 'string',
            abreviacao: 'MLF',
            cadeira: 'string'
          },
          pode_votar: true,
          votou: false
        },
      ],
      data: '2016-08-29T09:12:33.001Z'
    },
    tipo: 'ORDINARIA',
    categoria: 'REPERCUSSAO_GERAL',
    modalidade: 'VIRTUAL',
    data_inicio: '2016-08-29T09:12:33.001Z',
    data_fim: '2016-08-29T09:12:33.001Z',
    secretario: {
      id: 19,
      nome: 'Carmen'
    },
    situacao: 'PUBLICADA'
  }
];



export const processos: Processo[] = [
  {
    id: 123455,
    ementa: 'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    lista: [{
      descricao: 'Semelhante a ADI 100',
      id: 123445,
      gestor: {
        numero: 19,
        ocupante: {
          id: 12314441,
          nome: 'Luiz Fux',
          imagem: 'string',
          abreviacao: 'MLF',
          cadeira: 'string'
        },
        criacao: '2016-08-29T09:12:33.001Z',
      },
      publica: false
    }],
    classe: 'ADI',
    numero: 100,
    nome: 'Embargo de declaração',
    situacao: SituacaoDoProcesso.Pautado,
    tipo: TipoDoProcesso.Merito,
    relator: {
      numero: 19,
      ocupante: {
        id: 12314441,
        nome: 'Luiz Fux',
        imagem: 'string',
        abreviacao: 'MLF',
        cadeira: 'string'
      },
      criacao: '2016-08-29T09:12:33.001Z'
    },
    redator: {
      numero: 19,
      ocupante: {
        id: 12314441,
        nome: 'Luiz Fux',
        imagem: 'string',
        abreviacao: 'MLF',
        cadeira: 'string'
      },
      criacao: '2016-08-29T09:12:33.001Z'
    },
    capitulos: [
      {
        id: 123455,
        descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus omnis eum ratione, impedit, consequuntur laborum amet tempore iure accusamus in nulla voluptates odit. Eum fugit eius, assumenda distinctio quidem quia?',
        ordem: 1,
        tipo: 'Mérito'
      }
    ]
  },
];

