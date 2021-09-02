import { tags as tagData } from 'app/mock-api/pautas/tags/data';
import { TipoDoProcesso } from 'app/modules/acervo/model/enums/tipoDoProcesso.enum';
import { Documento } from 'app/modules/acervo/model/interfaces/documento.interface';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';

export const processo: Processo[] = [
  {
    id:         1,
    nome:       'Mérito',
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
  },

  {
    id:         2,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    nome:     'Agravo Regimental',
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
  },

  {
    id:         3,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    nome:     'Terceiro Agravo',
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
  },

  {
    id:         4,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    nome:     'Quarto agravo',
    lista:      [
                  tagData[3],
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
  },

  {
    id:         5,
    nome:     'Tese',
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
  },

  {
    id:         6,
    nome:     'Tese',
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
