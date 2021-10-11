import { tags as tagData } from 'app/mock-api/pautas/tags/data';
import { ministro } from 'app/mock-api/pautas/ministro/data';
import { TipoDoProcesso } from 'app/modules/acervo/model/enums/tipoDoProcesso.enum';
import { Documento } from 'app/modules/acervo/model/interfaces/documento.interface';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { Voto } from 'app/modules/acervo/model/interfaces/voto.interface';

export const processo: Processo[] = [
  {
    id:         1,
    nome:       'Mérito',
    abreviacao: '',
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    lista:      [
                  tagData[0],
                  tagData[1],
                ],
    classe:     'ADI',
    numero:     100,
    situacao:   1,
    tipo:       TipoDoProcesso.Recurso,
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
    relator: ministro[0],
  },

  {
    id:         2,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    nome:       'Agravo Regimental',
    abreviacao: 'Ag',
    lista:      [
                  tagData[2],
                ],
    classe:     'ADI',
    numero:     200,
    situacao:   2,
    tipo:       TipoDoProcesso.Recurso,
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
    relator: ministro[1],
  },

  {
    id:         3,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    nome:       'Terceiro Agravo',
    abreviacao: 'Ag-Ag-Ag',
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
    relator: ministro[2],
  },

  {
    id:         4,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    nome:       'Quarto agravo',
    abreviacao: 'Ag-Ag-Ag-Ag',
    lista:      [
                  tagData[3],
                  tagData[2]
                ],
    classe:     'ADI',
    numero:     300,
    situacao:   4,
    tipo:       TipoDoProcesso.Recurso,
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
    relator: ministro[3],
  },

  {
    id:         5,
    nome:       'Tese',
    abreviacao: '',
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
    relator: ministro[4],
  },

  {
    id:         6,
    nome:       'Tese',
    abreviacao: '',
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
    relator: ministro[5],
  },

  {
    id:         7,
    nome:       'Tese',
    abreviacao: '',
    ementa:   'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    lista:        [
                  tagData[0],
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
    relator: ministro[6],
  },

  {
    id:         8,
    nome:       'Tese',
    abreviacao: '',
    ementa:   'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    lista:        [
                  tagData[1],
                ],
    classe:     'RE',
    numero:     142685,
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
    relator: ministro[7],
  },
];

export const documentos: Documento[] = [
  {
    id: 1,
    nome: 'Relatório',
    tipo: 'pdf',
    url: 'http://redir.stf.jus.br/paginadorpub/paginador.jsp?docTP=TP&docID=752545388'
  },
  {
    id: 2,
    nome: 'Íntegra do Voto do Relator',
    tipo: 'pdf',
    url: 'https://www.conjur.com.br/dl/voto-gilmar-mendes-adi-reeleicao.pdf'
  },
  {
    id: 3,
    nome: 'Voto Divergente',
    tipo: 'pdf',
    url: 'https://www.cjf.jus.br/publico/pdfs/00732619720144036301.pdf'
  },
]

export const votos: Voto[] = [
  {
    id:             1,
    situacao:       'situacao',
    nome:           'nome',
    conteudo:       'PGgyPlByaW1laXJhIFByZWxpbWluYXI8L2gyPg0KICAgICAgICAgICAgICAgICAgICA8cD4NCiAgICAgICAgICAgICAgICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEFkaXBpc2NpIHF1YXNpIG5vYmlzIG5lY2Vzc2l0YXRpYnVzPyBNYWlvcmVzIGFzcGVybmF0dXIgbWF4aW1lIHF1aWRlbSBwZXJzcGljaWF0aXMsIGlsbG8gaXRhcXVlIHZlbmlhbSwgcmVwZWxsYXQgdmVybywgcmVydW0gY29ycG9yaXMgZGlzdGluY3RpbyBtb2RpIGluIHZvbHVwdGF0ZW0gZXhjZXB0dXJpIHZvbHVwdGFzLg0KICAgICAgICAgICAgICAgICAgICA8L3A+DQoNCiAgICAgICAgICAgICAgICAgICAgPGgyPk3DqXJpdG88L2gyPg0KICAgICAgICAgICAgICAgICAgICA8cD4NCiAgICAgICAgICAgICAgICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEFkaXBpc2NpIHF1YXNpIG5vYmlzIG5lY2Vzc2l0YXRpYnVzPyBNYWlvcmVzIGFzcGVybmF0dXIgbWF4aW1lIHF1aWRlbSBwZXJzcGljaWF0aXMsIGlsbG8gaXRhcXVlIHZlbmlhbSwgcmVwZWxsYXQgdmVybywgcmVydW0gY29ycG9yaXMgZGlzdGluY3RpbyBtb2RpIGluIHZvbHVwdGF0ZW0gZXhjZXB0dXJpIHZvbHVwdGFzLg0KICAgICAgICAgICAgICAgICAgICA8L3A+',
    autor:          ministro[0],
    tipo:           'VOGAL',
    acompanharam:   [ ministro[1], ministro[2], ministro[3], ministro[4], ministro[5], ministro[6], ministro[7] ],
  },

  {
    id:             1,
    situacao:       'situacao',
    nome:           'nome',
    conteudo:       'PGgyPlByaW1laXJhIFByZWxpbWluYXI8L2gyPg0KICAgICAgICAgICAgICAgICAgICA8cD4NCiAgICAgICAgICAgICAgICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEFkaXBpc2NpIHF1YXNpIG5vYmlzIG5lY2Vzc2l0YXRpYnVzPyBNYWlvcmVzIGFzcGVybmF0dXIgbWF4aW1lIHF1aWRlbSBwZXJzcGljaWF0aXMsIGlsbG8gaXRhcXVlIHZlbmlhbSwgcmVwZWxsYXQgdmVybywgcmVydW0gY29ycG9yaXMgZGlzdGluY3RpbyBtb2RpIGluIHZvbHVwdGF0ZW0gZXhjZXB0dXJpIHZvbHVwdGFzLg0KICAgICAgICAgICAgICAgICAgICA8L3A+DQoNCiAgICAgICAgICAgICAgICAgICAgPGgyPk3DqXJpdG88L2gyPg0KICAgICAgICAgICAgICAgICAgICA8cD4NCiAgICAgICAgICAgICAgICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEFkaXBpc2NpIHF1YXNpIG5vYmlzIG5lY2Vzc2l0YXRpYnVzPyBNYWlvcmVzIGFzcGVybmF0dXIgbWF4aW1lIHF1aWRlbSBwZXJzcGljaWF0aXMsIGlsbG8gaXRhcXVlIHZlbmlhbSwgcmVwZWxsYXQgdmVybywgcmVydW0gY29ycG9yaXMgZGlzdGluY3RpbyBtb2RpIGluIHZvbHVwdGF0ZW0gZXhjZXB0dXJpIHZvbHVwdGFzLg0KICAgICAgICAgICAgICAgICAgICA8L3A+',
    autor:          ministro[3],
    tipo:           'RELATOR',
    acompanharam:   [ ministro[2], ministro[1], ministro[3], ministro[4], ministro[6], ministro[7], ministro[8] ],
  },

  {
    id:             1,
    situacao:       'situacao',
    nome:           'nome',
    conteudo:       'PGgyPlByaW1laXJhIFByZWxpbWluYXI8L2gyPg0KICAgICAgICAgICAgICAgICAgICA8cD4NCiAgICAgICAgICAgICAgICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEFkaXBpc2NpIHF1YXNpIG5vYmlzIG5lY2Vzc2l0YXRpYnVzPyBNYWlvcmVzIGFzcGVybmF0dXIgbWF4aW1lIHF1aWRlbSBwZXJzcGljaWF0aXMsIGlsbG8gaXRhcXVlIHZlbmlhbSwgcmVwZWxsYXQgdmVybywgcmVydW0gY29ycG9yaXMgZGlzdGluY3RpbyBtb2RpIGluIHZvbHVwdGF0ZW0gZXhjZXB0dXJpIHZvbHVwdGFzLg0KICAgICAgICAgICAgICAgICAgICA8L3A+DQoNCiAgICAgICAgICAgICAgICAgICAgPGgyPk3DqXJpdG88L2gyPg0KICAgICAgICAgICAgICAgICAgICA8cD4NCiAgICAgICAgICAgICAgICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEFkaXBpc2NpIHF1YXNpIG5vYmlzIG5lY2Vzc2l0YXRpYnVzPyBNYWlvcmVzIGFzcGVybmF0dXIgbWF4aW1lIHF1aWRlbSBwZXJzcGljaWF0aXMsIGlsbG8gaXRhcXVlIHZlbmlhbSwgcmVwZWxsYXQgdmVybywgcmVydW0gY29ycG9yaXMgZGlzdGluY3RpbyBtb2RpIGluIHZvbHVwdGF0ZW0gZXhjZXB0dXJpIHZvbHVwdGFzLg0KICAgICAgICAgICAgICAgICAgICA8L3A+',
    autor:          ministro[2],
    tipo:           'VISTA',
    acompanharam:   [ ministro[5], ministro[2], ministro[7], ministro[4], ministro[2], ministro[6] ],
  },

  {
    id:             1,
    situacao:       'situacao',
    nome:           'nome',
    conteudo:       'PGgyPlByaW1laXJhIFByZWxpbWluYXI8L2gyPg0KICAgICAgICAgICAgICAgICAgICA8cD4NCiAgICAgICAgICAgICAgICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEFkaXBpc2NpIHF1YXNpIG5vYmlzIG5lY2Vzc2l0YXRpYnVzPyBNYWlvcmVzIGFzcGVybmF0dXIgbWF4aW1lIHF1aWRlbSBwZXJzcGljaWF0aXMsIGlsbG8gaXRhcXVlIHZlbmlhbSwgcmVwZWxsYXQgdmVybywgcmVydW0gY29ycG9yaXMgZGlzdGluY3RpbyBtb2RpIGluIHZvbHVwdGF0ZW0gZXhjZXB0dXJpIHZvbHVwdGFzLg0KICAgICAgICAgICAgICAgICAgICA8L3A+DQoNCiAgICAgICAgICAgICAgICAgICAgPGgyPk3DqXJpdG88L2gyPg0KICAgICAgICAgICAgICAgICAgICA8cD4NCiAgICAgICAgICAgICAgICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEFkaXBpc2NpIHF1YXNpIG5vYmlzIG5lY2Vzc2l0YXRpYnVzPyBNYWlvcmVzIGFzcGVybmF0dXIgbWF4aW1lIHF1aWRlbSBwZXJzcGljaWF0aXMsIGlsbG8gaXRhcXVlIHZlbmlhbSwgcmVwZWxsYXQgdmVybywgcmVydW0gY29ycG9yaXMgZGlzdGluY3RpbyBtb2RpIGluIHZvbHVwdGF0ZW0gZXhjZXB0dXJpIHZvbHVwdGFzLg0KICAgICAgICAgICAgICAgICAgICA8L3A+',
    autor:          ministro[4],
    tipo:           'PRESIDENTE',
    acompanharam:   [ ministro[1], ministro[2], ministro[3], ministro[4], ministro[5], ministro[6], ministro[7], ministro[8] ],
  },

  {
    id:             1,
    situacao:       'situacao',
    nome:           'nome',
    conteudo:       'PGRpdiBfbmdjb250ZW50LWx1bi1jMjE1PSIiIGNsYXNzPSJteS00Ij48aDI+UHJpbWVpcmEgUHJlbGltaW5hcjwvaDI+DQogICAgICAgICAgICAgICAgICAgIDxwPg0KICAgICAgICAgICAgICAgICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gQWRpcGlzY2kgcXVhc2kgbm9iaXMgbmVjZXNzaXRhdGlidXM/IE1haW9yZXMgYXNwZXJuYXR1ciBtYXhpbWUgcXVpZGVtIHBlcnNwaWNpYXRpcywgaWxsbyBpdGFxdWUgdmVuaWFtLCByZXBlbGxhdCB2ZXJvLCByZXJ1bSBjb3Jwb3JpcyBkaXN0aW5jdGlvIG1vZGkgaW4gdm9sdXB0YXRlbSBleGNlcHR1cmkgdm9sdXB0YXMuDQogICAgICAgICAgICAgICAgICAgIDwvcD4NCg0KICAgICAgICAgICAgICAgICAgICA8aDI+TcOpcml0bzwvaDI+DQogICAgICAgICAgICAgICAgICAgIDxwPg0KICAgICAgICAgICAgICAgICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gQWRpcGlzY2kgcXVhc2kgbm9iaXMgbmVjZXNzaXRhdGlidXM/IE1haW9yZXMgYXNwZXJuYXR1ciBtYXhpbWUgcXVpZGVtIHBlcnNwaWNpYXRpcywgaWxsbyBpdGFxdWUgdmVuaWFtLCByZXBlbGxhdCB2ZXJvLCByZXJ1bSBjb3Jwb3JpcyBkaXN0aW5jdGlvIG1vZGkgaW4gdm9sdXB0YXRlbSBleGNlcHR1cmkgdm9sdXB0YXMuDQogICAgICAgICAgICAgICAgICAgIDwvcD4NCjxwPg0KICAgICAgICAgICAgICAgICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gQWRpcGlzY2kgcXVhc2kgbm9iaXMgbmVjZXNzaXRhdGlidXM/IE1haW9yZXMgYXNwZXJuYXR1ciBtYXhpbWUgcXVpZGVtIHBlcnNwaWNpYXRpcywgaWxsbyBpdGFxdWUgdmVuaWFtLCByZXBlbGxhdCB2ZXJvLCByZXJ1bSBjb3Jwb3JpcyBkaXN0aW5jdGlvIG1vZGkgaW4gdm9sdXB0YXRlbSBleGNlcHR1cmkgdm9sdXB0YXMuDQogICAgICAgICAgICAgICAgICAgIDwvcD4NCg0KICAgICAgICAgICAgICAgICAgICA8aDI+TcOpcml0bzwvaDI+DQogICAgICAgICAgICAgICAgICAgIDxwPg0KICAgICAgICAgICAgICAgICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gQWRpcGlzY2kgcXVhc2kgbm9iaXMgbmVjZXNzaXRhdGlidXM/IE1haW9yZXMgYXNwZXJuYXR1ciBtYXhpbWUgcXVpZGVtIHBlcnNwaWNpYXRpcywgaWxsbyBpdGFxdWUgdmVuaWFtLCByZXBlbGxhdCB2ZXJvLCByZXJ1bSBjb3Jwb3JpcyBkaXN0aW5jdGlvIG1vZGkgaW4gdm9sdXB0YXRlbSBleGNlcHR1cmkgdm9sdXB0YXMuDQogICAgICAgICAgICAgICAgICAgIDwvcD4NCjxwPg0KICAgICAgICAgICAgICAgICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gQWRpcGlzY2kgcXVhc2kgbm9iaXMgbmVjZXNzaXRhdGlidXM/IE1haW9yZXMgYXNwZXJuYXR1ciBtYXhpbWUgcXVpZGVtIHBlcnNwaWNpYXRpcywgaWxsbyBpdGFxdWUgdmVuaWFtLCByZXBlbGxhdCB2ZXJvLCByZXJ1bSBjb3Jwb3JpcyBkaXN0aW5jdGlvIG1vZGkgaW4gdm9sdXB0YXRlbSBleGNlcHR1cmkgdm9sdXB0YXMuDQogICAgICAgICAgICAgICAgICAgIDwvcD4NCg0KICAgICAgICAgICAgICAgICAgICA8aDI+TcOpcml0bzwvaDI+DQogICAgICAgICAgICAgICAgICAgIDxwPg0KICAgICAgICAgICAgICAgICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gQWRpcGlzY2kgcXVhc2kgbm9iaXMgbmVjZXNzaXRhdGlidXM/IE1haW9yZXMgYXNwZXJuYXR1ciBtYXhpbWUgcXVpZGVtIHBlcnNwaWNpYXRpcywgaWxsbyBpdGFxdWUgdmVuaWFtLCByZXBlbGxhdCB2ZXJvLCByZXJ1bSBjb3Jwb3JpcyBkaXN0aW5jdGlvIG1vZGkgaW4gdm9sdXB0YXRlbSBleGNlcHR1cmkgdm9sdXB0YXMuDQogICAgICAgICAgICAgICAgICAgIDwvcD4NCjxwPg0KICAgICAgICAgICAgICAgICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gQWRpcGlzY2kgcXVhc2kgbm9iaXMgbmVjZXNzaXRhdGlidXM/IE1haW9yZXMgYXNwZXJuYXR1ciBtYXhpbWUgcXVpZGVtIHBlcnNwaWNpYXRpcywgaWxsbyBpdGFxdWUgdmVuaWFtLCByZXBlbGxhdCB2ZXJvLCByZXJ1bSBjb3Jwb3JpcyBkaXN0aW5jdGlvIG1vZGkgaW4gdm9sdXB0YXRlbSBleGNlcHR1cmkgdm9sdXB0YXMuDQogICAgICAgICAgICAgICAgICAgIDwvcD4NCg0KICAgICAgICAgICAgICAgICAgICA8aDI+TcOpcml0bzwvaDI+DQogICAgICAgICAgICAgICAgICAgIDxwPg0KICAgICAgICAgICAgICAgICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gQWRpcGlzY2kgcXVhc2kgbm9iaXMgbmVjZXNzaXRhdGlidXM/IE1haW9yZXMgYXNwZXJuYXR1ciBtYXhpbWUgcXVpZGVtIHBlcnNwaWNpYXRpcywgaWxsbyBpdGFxdWUgdmVuaWFtLCByZXBlbGxhdCB2ZXJvLCByZXJ1bSBjb3Jwb3JpcyBkaXN0aW5jdGlvIG1vZGkgaW4gdm9sdXB0YXRlbSBleGNlcHR1cmkgdm9sdXB0YXMuDQogICAgICAgICAgICAgICAgICAgIDwvcD4NCjwvZGl2Pg==',
    autor:          ministro[5],
    tipo:           'VOGAL',
    acompanharam:   [ ministro[1], ministro[2], ministro[3], ministro[4], ministro[5], ministro[6], ministro[7], ministro[8] ],
  },

  {
    id:             1,
    situacao:       'situacao',
    nome:           'nome',
    conteudo:       'PGgyPlByaW1laXJhIFByZWxpbWluYXI8L2gyPg0KICAgICAgICAgICAgICAgICAgICA8cD4NCiAgICAgICAgICAgICAgICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEFkaXBpc2NpIHF1YXNpIG5vYmlzIG5lY2Vzc2l0YXRpYnVzPyBNYWlvcmVzIGFzcGVybmF0dXIgbWF4aW1lIHF1aWRlbSBwZXJzcGljaWF0aXMsIGlsbG8gaXRhcXVlIHZlbmlhbSwgcmVwZWxsYXQgdmVybywgcmVydW0gY29ycG9yaXMgZGlzdGluY3RpbyBtb2RpIGluIHZvbHVwdGF0ZW0gZXhjZXB0dXJpIHZvbHVwdGFzLg0KICAgICAgICAgICAgICAgICAgICA8L3A+DQoNCiAgICAgICAgICAgICAgICAgICAgPGgyPk3DqXJpdG88L2gyPg0KICAgICAgICAgICAgICAgICAgICA8cD4NCiAgICAgICAgICAgICAgICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEFkaXBpc2NpIHF1YXNpIG5vYmlzIG5lY2Vzc2l0YXRpYnVzPyBNYWlvcmVzIGFzcGVybmF0dXIgbWF4aW1lIHF1aWRlbSBwZXJzcGljaWF0aXMsIGlsbG8gaXRhcXVlIHZlbmlhbSwgcmVwZWxsYXQgdmVybywgcmVydW0gY29ycG9yaXMgZGlzdGluY3RpbyBtb2RpIGluIHZvbHVwdGF0ZW0gZXhjZXB0dXJpIHZvbHVwdGFzLg0KICAgICAgICAgICAgICAgICAgICA8L3A+',
    autor:          ministro[6],
    tipo:           'VOGAL',
    acompanharam:   [ ministro[1], ministro[2], ministro[3], ministro[4], ministro[5], ministro[6], ministro[7], ministro[8] ],
  },

  {
    id:             1,
    situacao:       'situacao',
    nome:           'nome',
    conteudo:       'PGgyPlByaW1laXJhIFByZWxpbWluYXI8L2gyPg0KICAgICAgICAgICAgICAgICAgICA8cD4NCiAgICAgICAgICAgICAgICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEFkaXBpc2NpIHF1YXNpIG5vYmlzIG5lY2Vzc2l0YXRpYnVzPyBNYWlvcmVzIGFzcGVybmF0dXIgbWF4aW1lIHF1aWRlbSBwZXJzcGljaWF0aXMsIGlsbG8gaXRhcXVlIHZlbmlhbSwgcmVwZWxsYXQgdmVybywgcmVydW0gY29ycG9yaXMgZGlzdGluY3RpbyBtb2RpIGluIHZvbHVwdGF0ZW0gZXhjZXB0dXJpIHZvbHVwdGFzLg0KICAgICAgICAgICAgICAgICAgICA8L3A+DQoNCiAgICAgICAgICAgICAgICAgICAgPGgyPk3DqXJpdG88L2gyPg0KICAgICAgICAgICAgICAgICAgICA8cD4NCiAgICAgICAgICAgICAgICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEFkaXBpc2NpIHF1YXNpIG5vYmlzIG5lY2Vzc2l0YXRpYnVzPyBNYWlvcmVzIGFzcGVybmF0dXIgbWF4aW1lIHF1aWRlbSBwZXJzcGljaWF0aXMsIGlsbG8gaXRhcXVlIHZlbmlhbSwgcmVwZWxsYXQgdmVybywgcmVydW0gY29ycG9yaXMgZGlzdGluY3RpbyBtb2RpIGluIHZvbHVwdGF0ZW0gZXhjZXB0dXJpIHZvbHVwdGFzLg0KICAgICAgICAgICAgICAgICAgICA8L3A+',
    autor:          ministro[7],
    tipo:           'VOGAL',
    acompanharam:   [ ministro[1], ministro[2], ministro[3], ministro[4], ministro[5], ministro[6], ministro[7], ministro[8] ],
  },

  {
    id:             1,
    situacao:       'situacao',
    nome:           'nome',
    conteudo:       'PGgyPlByaW1laXJhIFByZWxpbWluYXI8L2gyPg0KICAgICAgICAgICAgICAgICAgICA8cD4NCiAgICAgICAgICAgICAgICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEFkaXBpc2NpIHF1YXNpIG5vYmlzIG5lY2Vzc2l0YXRpYnVzPyBNYWlvcmVzIGFzcGVybmF0dXIgbWF4aW1lIHF1aWRlbSBwZXJzcGljaWF0aXMsIGlsbG8gaXRhcXVlIHZlbmlhbSwgcmVwZWxsYXQgdmVybywgcmVydW0gY29ycG9yaXMgZGlzdGluY3RpbyBtb2RpIGluIHZvbHVwdGF0ZW0gZXhjZXB0dXJpIHZvbHVwdGFzLg0KICAgICAgICAgICAgICAgICAgICA8L3A+DQoNCiAgICAgICAgICAgICAgICAgICAgPGgyPk3DqXJpdG88L2gyPg0KICAgICAgICAgICAgICAgICAgICA8cD4NCiAgICAgICAgICAgICAgICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEFkaXBpc2NpIHF1YXNpIG5vYmlzIG5lY2Vzc2l0YXRpYnVzPyBNYWlvcmVzIGFzcGVybmF0dXIgbWF4aW1lIHF1aWRlbSBwZXJzcGljaWF0aXMsIGlsbG8gaXRhcXVlIHZlbmlhbSwgcmVwZWxsYXQgdmVybywgcmVydW0gY29ycG9yaXMgZGlzdGluY3RpbyBtb2RpIGluIHZvbHVwdGF0ZW0gZXhjZXB0dXJpIHZvbHVwdGFzLg0KICAgICAgICAgICAgICAgICAgICA8L3A+',
    autor:          ministro[8],
    tipo:           'VOGAL',
    acompanharam:   [ ministro[1], ministro[2], ministro[3], ministro[4], ministro[5], ministro[6], ministro[7], ministro[8] ],
  },
];
