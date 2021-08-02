import { tags as tagData } from 'app/mock-api/pautas/tags/data';
import { SituacaoDoProcesso } from 'app/modules/acervo/model/enums/situacaoDoProcesso.enum';
import { TipoDoProcesso } from 'app/modules/acervo/model/enums/tipodoprocesso.enum';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';

export const processo: Processo[] = [
  {
    id:         1,
    nome:       'Mérito',
    lista:      [
                  tagData[0],
                  tagData[1],
                ],
    classe:     'ADI',
    numero:     100,
    cadeira:    1,
    descricao:  'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    situacao:   SituacaoDoProcesso["Apto a Julgar"],
    tipo:       TipoDoProcesso.Incidente,
    capitulos:  [
      {
        id:     1,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
      {
        id:     2,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
      {
        id:     3,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
      {
        id:     4,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
    ],
  },

  {
    id:         2,
    nome:     'Agravo Regimental',
    lista:      [
                  tagData[2],
                ],
    classe:     'ADI',
    numero:     200,
    cadeira:    1,
    descricao:  'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    situacao:   SituacaoDoProcesso.Pautado,
    tipo:       TipoDoProcesso.Incidente,
    capitulos:  [
      {
        id:     1,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
      {
        id:     2,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
      {
        id:     3,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
      {
        id:     4,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
    ],
  },

  {
    id:         3,
    nome:     'Terceiro Agravo',
    lista:      [
                  tagData[3],
                ],
    classe:     'ADI',
    numero:     300,
    cadeira:    1,
    descricao:  'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    situacao:   SituacaoDoProcesso.Pautado,
    tipo:       TipoDoProcesso.Merito,
    capitulos:  [
      {
        id:     1,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
      {
        id:     2,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
      {
        id:     3,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
      {
        id:     4,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
    ],
  },

  {
    id:         4,
    nome:     'Quarto agravo',
    lista:      [
                  tagData[3],
                ],
    classe:     'ADI',
    numero:     300,
    cadeira:    1,
    descricao:  'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    situacao:   SituacaoDoProcesso["Em julgamento"],
    tipo:       TipoDoProcesso.Merito,
    capitulos:  [
      {
        id:     1,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
      {
        id:     2,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
      {
        id:     3,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
      {
        id:     4,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
    ],
  },

  {
    id:         5,
    nome:     'Quinto agravo',
    lista:      [
                  tagData[1],
                  tagData[2],
                  tagData[3],
                ],
    classe:     'ADI',
    numero:     300,
    cadeira:    1,
    descricao:  'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    situacao:   SituacaoDoProcesso["Apto a Julgar"],
    tipo:       TipoDoProcesso.Merito,
    capitulos:  [
      {
        id:     1,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
      {
        id:     2,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
      {
        id:     3,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
      {
        id:     4,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
        ordem:  1,
        tipo:   'Mérito',
      },
    ],
  },
];