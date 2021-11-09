import { RevisaoInteiroTeor } from "app/modules/revisar-inteiro-teor/revisar-inteiro-teor.component";
import { ministro } from "../ministro/data";
import { sessao } from "../sessoes-julgamento/data";
import { tags } from "../tags/data";

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
        arquivo: '/documento/123123',
        autores: [
          ministro[0],
          ministro[1],
          ministro[2],
        ],
        responsavel: ministro[0],
        comentario: 'string',
        nome: 'Voto',
        data_criacao: '2016-08-29T09:12:33.001Z',
        situacao: 'Assinado',
        revisado: true,
        ordem: 0,
      }
    ]
  }
];
