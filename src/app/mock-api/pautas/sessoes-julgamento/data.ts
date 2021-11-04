import { SituacaoDoProcesso } from "app/modules/acervo/model/enums/situacaoDoProcesso.enum";
import { TipoCapitulo } from "app/modules/acervo/model/enums/tipoCapitulo.enum";
import { TipoDoProcesso } from "app/modules/acervo/model/enums/tipoDoProcesso.enum";
import { Processo } from "app/modules/acervo/model/interfaces/processo.interface";
import { SessaoJulgamento } from "app/modules/acervo/model/interfaces/sessao-julgamento.interface";
import { capitulo } from "../capitulo/data";
import { colegiado, ministro } from "../ministro/data";

export const sessao: SessaoJulgamento[] = [
  {
    numero: 1000,
    ano: 2021,
    colegiado: '',
    tipo: "ORDINARIA",
    categoria: "REPERCUSSAO_GERAL",
    modalidade: "VIRTUAL",
    data_inicio: "2016-08-29T09:12:33.001Z",
    data_fim: "2016-08-29T09:12:33.001Z",
    secretario: {
      id: 19,
      nome: "Carmen"
    },
    situacao: "PUBLICADA"
  }
];



export const processos: Processo[] = [
  {
    id: 123455,
    abreviacao: '',
    ementa: "Sessão de julgamento extraordinária para tratar da divisão de terras.",
    lista: [{
      descricao: "Semelhante a ADI 100",
      id: 123445,
      gestor: {
        numero: 19,
        criacao: "2016-08-29T09:12:33.001Z",
      },
      publica: false
    }],
    classe: "ADI",
    numero: 100,
    nome: "Embargo de declaração",
    situacao: SituacaoDoProcesso.Pautado,
    tipo: TipoDoProcesso.Merito,
    relator: ministro[0],
    redator: ministro[1],
    capitulos: [
      capitulo[0],
    ]
  },
]

