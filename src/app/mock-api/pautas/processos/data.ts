import { Processo, SituacaoDoProcesso, TipoDoProcesso} from "app/modules/acervo/tabela/tabela.component";
import { tags as tagData } from 'app/mock-api/pautas/tags/data';

export const processo: Processo[] = [
  {
    id:         1,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras',
    lista:      [
                  tagData[0],
                  tagData[1],
                ],
    classe:     'ADI',
    numero:     100,
    cadeira:    'Embargo de declaração',
    descricao:  'Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra nisi. Mauris aliquet nunc non',
    situacao:   SituacaoDoProcesso["Apto a Julgar"],
    tipo:       TipoDoProcesso.Incidente,
  },

  {
    id:         2,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras',
    lista:      [
                  tagData[2],
                ],
    classe:     'ADI',
    numero:     200,
    cadeira:    'Embargo de declaração',
    descricao:  'Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra nisi. Mauris aliquet nunc non',
    situacao:   SituacaoDoProcesso.Pautado,
    tipo:       TipoDoProcesso.Incidente,
  },

  {
    id:         3,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras',
    lista:      [
                  tagData[3],
                ],
    classe:     'ADI',
    numero:     300,
    cadeira:    'Embargo de declaração',
    descricao:  'Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra nisi. Mauris aliquet nunc non',
    situacao:   SituacaoDoProcesso.Pautado,
    tipo:       TipoDoProcesso.Merito,
  },

  {
    id:         4,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras',
    lista:      [
                  tagData[3],
                ],
    classe:     'ADI',
    numero:     400,
    cadeira:    'Embargo de declaração',
    descricao:  'Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra nisi. Mauris aliquet nunc non',
    situacao:   SituacaoDoProcesso["Em julgamento"],
    tipo:       TipoDoProcesso.Merito,
  },

  {
    id:         5,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras',
    lista:      [
                  tagData[1],
                  tagData[2],
                  tagData[3],
                ],
    classe:     'ADI',
    numero:     500,
    cadeira:    'Embargo de declaração',
    descricao:  'Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra nisi. Mauris aliquet nunc non',
    situacao:   SituacaoDoProcesso["Apto a Julgar"],
    tipo:       TipoDoProcesso.Merito,
  },
];