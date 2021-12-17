import { Ata } from "app/modules/acervo/model/interfaces/ata.interface";

import { CapitulosParaPublicacao, Envolvido } from "app/modules/acervo/model/interfaces/capitulo.interface";

import { capitulo } from "../capitulo/data"
import { ministro } from "../ministro/data";
import { Destaque, Vista } from "app/modules/acervo/model/interfaces/vista-e-destaque.interface";

export function getAtas() {
  if(sessionStorage.getItem('atas') == null)
    sessionStorage.setItem('atas', JSON.stringify(atas));
  return JSON.parse(sessionStorage.getItem('atas'));
};

export const envolvidos: Envolvido[] = [
  {
    nome: "Instituto Nacional do Seguro Social",
    polo: "REQUERENTE",
    categoria: "REQUERENTE",
    identificacoes: [],
  },
  {
    nome: "Francisco Chagas Ferreira Lima",
    polo: "RECORRIDO",
    categoria: "RECORRIDO",
    identificacoes: [],
  },
  {
    nome: "Andrea Ponte Barbosa",
    polo: "REQUERENTE",
    categoria: "ADVOGADA",
    identificacoes: [
      "OAB 13190-B/CE",
      "RG 12345-6",
    ],
  },
  {
    nome: "Geissa Braga Calvacante",
    polo: "RECORRIDO",
    categoria: "ADVOGADA",
    identificacoes: [
      "OAB 12314-B/CE",
      "RG 12345-6",
    ],
  },
];

export const destaques: Destaque[] = [
  {
    id: 1,
    ministro: 1,
    processo: 1,
    sessao: 1,
    data: "2016-08-29T09:12:33.001Z",
    texto: "Após o voto do Ministro Marco Aurélio, Relator, que implementava a ordem, pediu destaque do processo do plenário virtual.",
  },
];

export const vistas: Vista[] = [
  {
    id: 1,
    ministro: 1,
    processo: 1,
    sessao: 1,
    data: "2016-08-29T09:12:33.001Z",
    texto: "Após o voto do Ministro Marco Aurélio, Relator, que implementava a ordem, pediu vista dos autos o Ministro Alexandre de Moraes. Primeira Turma, Sessão Virtual de 13.11.2020 a 20.11.2020.",
  },
]

export const capitulos_para_publicacao: CapitulosParaPublicacao[] = [
  {
    classe: "ARE",
    classe_extenso: "RECURSO EXTRAORDINÁRIO COM AGRAVO",
    numero: "1311742",
    cadeia: "Ag",
    envolvidos,
    relator: ministro[0],
    redator: ministro[1],
    ministros_impedidos: [
      ministro[2],
    ],
    ministros_suspeitos: [
      ministro[3],
      ministro[4],
    ],
    processo: 0,
    capitulos: [
      capitulo[0],
      capitulo[1],
    ],
    destaques,
    vistas,
  },
  {
    classe: "AG",
    classe_extenso: "AGRAVO REGIMENTAL",
    numero: "100",
    cadeia: "Ag",
    envolvidos,
    relator: ministro[1],
    redator: ministro[9],
    ministros_impedidos: [
      ministro[0],
    ],
    ministros_suspeitos: [
      ministro[0],
    ],
    processo: 1,
    capitulos: [
      capitulo[2],
      capitulo[3],
      capitulo[4],
    ],
    destaques,
    vistas,
  },
  {
    classe: "classe",
    classe_extenso: "CLASSE DE CAPITULO PARA PUBLICACAO",
    numero: "numero",
    cadeia: "cadeia",
    envolvidos,
    relator: ministro[2],
    redator: ministro[8],
    ministros_impedidos: [
      ministro[0],
    ],
    ministros_suspeitos: [
      ministro[0],
    ],
    processo: 2,
    capitulos: [
      capitulo[5],
    ],
    destaques,
    vistas,
  },
]

export const atas: Ata[] = [
]
