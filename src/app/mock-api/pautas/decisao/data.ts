import { Decisao } from "app/modules/acervo/model/interfaces/decisao.interface";
import { Processo } from "app/modules/acervo/model/interfaces/processo.interface";
import { SessaoJulgamento } from "app/modules/acervo/model/interfaces/sessao-julgamento.interface";
import { tags as tagData } from 'app/mock-api/pautas/tags/data';
import { TipoDoProcesso } from "app/modules/acervo/model/enums/tipoDoProcesso.enum";
import { TipoCapitulo } from "app/modules/acervo/model/enums/tipoCapitulo.enum";
import { ministro } from "../ministro/data";
import { processo } from "../processos/data";

export const decisoes: Array<{decisoes: Decisao[], processo: Processo, sessao: any}> = [
  {
    decisoes: [
      {
        descricao:          'Descrição',
        dispositivo:        'dispositivos',
        ministro_condutor:  'ministro condutor',
        ministros_acordam:  [ministro[0], ministro[1]],
        texto:              'texto',
        tipo:               'tipo',
      },

      {
        descricao:          'Descrição',
        dispositivo:        'dispositivos',
        ministro_condutor:  'ministro condutor',
        ministros_acordam:  [ministro[0]],
        texto:              'texto',
        tipo:               'tipo',
      },
    ],
    
    processo: {
      id:         1,
      nome:       'Mérito',
      abreviacao: 'Ag-Ag-Ag',
      ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
      lista:      [
                    tagData[0],
                    tagData[1],
                  ],
      classe:     'ADI',
      numero:     100,
      situacao:   1,
      tipo:       TipoDoProcesso.Merito,
      capitulos:  [
        {
          id:     1,
          descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
          ordem:  1,
          tipo:   TipoCapitulo.Merito,
          dispositivo: 'Deferida em parte'
        },
        {
          id:     2,
          descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
          ordem:  1,
          tipo:   TipoCapitulo.Merito,
          dispositivo: 'Deferida'
        },
        {
          id:     3,
          descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
          ordem:  1,
          tipo:   TipoCapitulo.Merito,
          dispositivo: 'Provido'
        },
        {
          id:     4,
          descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.',
          ordem:  1,
          tipo:   TipoCapitulo.Merito,
          dispositivo: 'Concedido'
        },
      ],
      relator: ministro[0],
    },
    
    sessao: {
      numero: 1000,
      ano: 2021,
      colegiado: "Primeira turma",
      
      tipo: "ORDINARIA",
      categoria: "REPERCUSSAO_GERAL",
      modalidade: "VIRTUAL",
      data_inicio: "2021-09-29T09:12:33.001Z",
      data_fim: "2021-10-29T09:12:33.001Z",
      
      secretario: {
        id: 19,
        nome: "Carmen",
      },
      situacao: "PUBLICADA",
    }
  },

  {
    decisoes: [],
    
    processo: processo[8],
    
    sessao: {
      numero: 1000,
      ano: 2021,
      colegiado: "Primeira turma",
      
      tipo: "ORDINARIA",
      categoria: "REPERCUSSAO_GERAL",
      modalidade: "VIRTUAL",
      data_inicio: "2021-09-29T09:12:33.001Z",
      data_fim: "2021-10-29T09:12:33.001Z",
      
      secretario: {
        id: 19,
        nome: "Carmen",
      },
      situacao: "PUBLICADA",
    }
  },
];