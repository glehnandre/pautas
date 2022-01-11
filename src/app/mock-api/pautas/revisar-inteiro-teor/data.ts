import { RevisaoInteiroTeor } from "app/modules/revisar-inteiro-teor/revisar-inteiro-teor.component";
import { ministro } from "../ministro/data";
import { sessao } from "../sessoes-julgamento/data";
import { tags } from "../tags/data";

export function getRevisoes() {
    if(sessionStorage.getItem('revisoes') == null)
      sessionStorage.setItem('revisoes', JSON.stringify(revisoes));
    return JSON.parse(sessionStorage.getItem('revisoes'));
};

export const revisoes: Array<RevisaoInteiroTeor> = [
  {
    id_processo: 9,
    status: 'Aberto',
    classe: 'ADI',
    numero: 400,
    nome: 'Agravo terceiro',
    tags: [
      tags[0],
      tags[1],
    ],
    sessoes: [
      sessao[0],
    ],
    documentos: [
      {
        id: 1,
        arquivo: '/assets/pdf/48-inteiro-teor-do-acordao.pdf',
        autores: [
          ministro[0],
          ministro[1],
          ministro[2],
        ],
        responsavel: ministro[0],
        comentario: 'Algum comentário aqui',
        nome: 'Relatório',
        data_criacao: '2021-08-29T09:12:33.001Z',
        situacao: 'Assinado',
        revisado: false,
        ordem: 1,
      },

      {
        id: 2,
        arquivo: '/assets/pdf/48-inteiro-teor-do-acordao.pdf',
        autores: [
          ministro[3],
          ministro[1],
          ministro[4],
        ],
        responsavel: ministro[2],
        comentario: 'Outro comentário aleatório',
        nome: 'Voto',
        data_criacao: '2021-09-20T09:12:33.001Z',
        situacao: 'Assinado',
        revisado: false,
        ordem: 2,
      },

      {
        id: 3,
        arquivo: '/assets/pdf/48-inteiro-teor-do-acordao.pdf',
        autores: [
          ministro[6],
          ministro[2],
          ministro[3],
        ],
        responsavel: ministro[1],
        comentario: 'Comentário sobre o voto',
        nome: 'Voto',
        data_criacao: '2021-10-15T09:12:33.001Z',
        situacao: 'Assinado',
        revisado: false,
        ordem: 3,
      },
    ]
  }
];
