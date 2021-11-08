import { sessao } from "../sessoes-julgamento/data";
import { tags } from "../tags/data";

export const revisoes: Array<any> = [
  {
    id_processo: 0,
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
          {
            id: 12314441,
            nome: 'Luiz Fux',
            imagem: 'string',
            abreviacao: 'MLF',
            genero: 'M',
            cadeira: 'string'
          }
        ],
        responsavel: {
          id: 12314441,
          nome: 'Luiz Fux',
          imagem: 'string',
          abreviacao: 'MLF',
          genero: 'M',
          cadeira: 'string'
        },
        comentario: 'string',
        nome: 'Voto',
        data_criacao: '2016-08-29T09:12:33.001Z',
        situacao: 'Assinado',
        revisado: true,
        ordem: 0
      }
    ]
  }
];
