import { tags as tagData } from 'app/mock-api/pautas/tags/data';
import { TipoDoProcesso } from 'app/modules/acervo/model/enums/tipoDoProcesso.enum';
import { Documento } from 'app/modules/acervo/model/interfaces/documento.interface';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';

const image = 'data:image/png;base64,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';

export const processo: Processo[] = [
  {
    id:         1,
    nome:       'Mérito',
    abreviacao: 'Mérito',
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    lista:      [
                  tagData[0],
                  tagData[1],
                ],
    classe:     'ADI',
    numero:     100,
    situacao:   1,
    tipo:       TipoDoProcesso.Cadeira,
    capitulos:  [
      {
        id:     1,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Liminar',
        dispositivo: 'Deferida em parte'
      },
      {
        id:     2,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Liminar',
        dispositivo: 'Deferida'
      },
      {
        id:     3,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
        dispositivo: 'Provido'
      },
      {
        id:     4,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Modulação de Efeitos',
        dispositivo: 'Concedido'
      },
    ],
    relator: {
        id: 2,
        nome: 'Dias Tofolli',
        abreviacao: 'DT',
        cadeira: {
          criacao: '2021-08-02T03:00:00.000Z',
          numero: 100,
        },
        imagem: image,
      },
  },

  {
    id:         2,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    nome:     'Agravo Regimental',
    abreviacao: 'Ag',
    lista:      [
                  tagData[2],
                ],
    classe:     'ADI',
    numero:     200,
    situacao:   2,
    tipo:       TipoDoProcesso.Incidente,
    capitulos:  [
      {
        id:     1,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
        dispositivo: 'Deferido'
      },
      {
        id:     2,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
        dispositivo: 'Procedente'
      },
      {
        id:     3,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
        dispositivo: 'Procedente'
      },
      {
        id:     4,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
        dispositivo: 'Procedente'
      },
    ],
    relator: {
        id: 2,
        nome: 'Dias Tofolli',
        abreviacao: 'DT',
        cadeira: {
          criacao: '2021-08-02T03:00:00.000Z',
          numero: 100,
        },
        imagem: image,
      },
  },

  {
    id:         3,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    nome:     'Terceiro Agravo',
    abreviacao: 'Ter-Ag',
    lista:      [
                  tagData[3],
                ],
    classe:     'ADI',
    numero:     300,
    situacao:   3,
    tipo:       TipoDoProcesso.Merito,
    capitulos:  [
      {
        id:     1,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Liminar',
        dispositivo: 'Deferida'
      },
      {
        id:     2,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
        dispositivo: 'Provido'
      },
      {
        id:     3,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  2,
        tipo:   'Mérito',
        dispositivo: 'Provido'
      },
      {
        id:     4,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
        dispositivo: 'Provido'
      },
    ],
    relator: {
        id: 2,
        nome: 'Dias Tofolli',
        abreviacao: 'DT',
        cadeira: {
          criacao: '2021-08-02T03:00:00.000Z',
          numero: 100,
        },
        imagem: image,
      },
  },

  {
    id:         4,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    nome:     'Quarto agravo',
    abreviacao: 'Qua-Ag',
    lista:      [
                  tagData[3],
                  tagData[2]
                ],
    classe:     'ADI',
    numero:     300,
    situacao:   4,
    tipo:       TipoDoProcesso.Merito,
    capitulos:  [
      {
        id:     1,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
        dispositivo: 'Provido'
      },
      {
        id:     2,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
        dispositivo: 'Provido'
      },
      {
        id:     3,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
        dispositivo: 'Provido'
      },
      {
        id:     4,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
        dispositivo: 'Provido'
      },
    ],
    relator: {
        id: 2,
        nome: 'Dias Tofolli',
        abreviacao: 'DT',
        cadeira: {
          criacao: '2021-08-02T03:00:00.000Z',
          numero: 100,
        },
        imagem: image,
      },
  },

  {
    id:         5,
    nome:     'Tese',
    abreviacao: 'Tese',
    ementa:   'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    lista:        [
                  tagData[4],
                ],
    classe:     'RE',
    numero:     1311742,
    situacao:   1,
    tipo:       TipoDoProcesso.Merito,
    capitulos:  [
      {
        id:     1,
        descricao: 'É constitucional o artigo 8º da Lei Complementar 173/2020, editado no âmbito do Programa Federativo de Enfrentamento ao Coronavírus SARS-CoV-2 (Covid-19).',
        ordem:  1,
        tipo:   'Tese',
        dispositivo: 'Reconhecida'
      }
    ],
    relator: {
        id: 2,
        nome: 'Dias Tofolli',
        abreviacao: 'DT',
        cadeira: {
          criacao: '2021-08-02T03:00:00.000Z',
          numero: 100,
        },
        imagem: image,
      },
  },

  {
    id:         6,
    nome:     'Tese',
    abreviacao: 'Tese',
    ementa:   'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    lista:        [
                  tagData[4],
                ],
    classe:     'RE',
    numero:     143255,
    situacao:   1,
    tipo:       TipoDoProcesso.Merito,
    capitulos:  [
      {
        id:     1,
        descricao: 'É constitucional o artigo 8º da Lei Complementar 173/2020, editado no âmbito do Programa Federativo de Enfrentamento ao Coronavírus SARS-CoV-2 (Covid-19).',
        ordem:  1,
        tipo:   'Tese',
        dispositivo: 'Reconhecida'
      }
    ],
    relator: {
        id: 2,
        nome: 'Dias Tofolli',
        abreviacao: 'DT',
        cadeira: {
          criacao: '2021-08-02T03:00:00.000Z',
          numero: 100,
        },
        imagem: image,
      },
  },
];

export const documentos: Documento[] = [
  {
    id: 1,
    nome: "Relatório",
    tipo: "pdf",
    url: "http://redir.stf.jus.br/paginadorpub/paginador.jsp?docTP=TP&docID=752545388"
  },
  {
    id: 2,
    nome: "Íntegra do Voto do Relator",
    tipo: "pdf",
    url: "https://www.conjur.com.br/dl/voto-gilmar-mendes-adi-reeleicao.pdf"
  },
  {
    id: 3,
    nome: "Voto Divergente",
    tipo: "pdf",
    url: "https://www.cjf.jus.br/publico/pdfs/00732619720144036301.pdf"
  },
]
