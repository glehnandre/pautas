import { ministro } from 'app/mock-api/pautas/ministro/data';
import { SituacaoDoProcesso } from 'app/shared/model/enums/situacaoDoProcesso.enum';
import { TipoDoProcesso } from 'app/shared/model/enums/tipoDoProcesso.enum';
import { Destaque } from 'app/shared/model/interfaces/destaque.interface';
import { Documento } from 'app/shared/model/interfaces/documento.interface';
import { Envolvido } from 'app/shared/model/interfaces/envolvido.interface';
import { Processo } from 'app/shared/model/interfaces/processo.interface';
import { Vista } from 'app/shared/model/interfaces/vista.interface';
import { Voto } from 'app/shared/model/interfaces/voto.interface';
import { capitulo } from '../capitulo/data';
import { getStorage } from '../storage';
import { tags as tagData } from '../tags/data';

export const envolvidos: Envolvido[] = [
    {
      nome: "Instituto Nacional do Seguro Social",
      polo: "ATIVO",
      categoria: "REQUERENTE",
      identificacoes: [],
    },
    {
      nome: "Francisco Chagas Ferreira Lima",
      polo: "PASSIVO",
      categoria: "RECORRIDO",
      identificacoes: [],
    },
    {
      nome: "Andrea Ponte Barbosa",
      polo: "ATIVO",
      categoria: "ADVOGADA",
      identificacoes: [
        "OAB 13190-B/CE",
        "RG 12345-6",
      ],
    },
    {
      nome: "Geissa Braga Calvacante",
      polo: "PASSIVO",
      categoria: "ADVOGADA",
      identificacoes: [
        "OAB 12314-B/CE",
        "RG 12345-6",
      ],
    },
  ];

export const processo: Processo[] = [
  {
    id:         1,
    cadeia:     'Mérito',
    abreviacao: '',
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    lista:      [
                  tagData[0],
                  tagData[1],
                ],
    classe:     'ADI',
    id_tipo_recurso: 1,
    numero:     100,
    situacao:   1,
    tipo:       TipoDoProcesso.Recurso,
    capitulos:  [
      capitulo[0],
      capitulo[1],
      capitulo[2],
      capitulo[3],
    ],
    suspensoes: [],
    vistas: [],
    destaques: [],
    relator: ministro[1],
    ministros_impedidos: [],
    ministros_suspeitos: [],
    envolvidos
  },

  {
    id:         2,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    cadeia:       'Agravo Regimental',
    abreviacao: 'Ag',
    lista:      [
                  tagData[2],
                ],
    classe:     'ADI',
    id_tipo_recurso: 1,
    numero:     200,
    situacao:   2,
    tipo:       TipoDoProcesso.Recurso,
    capitulos:  [
      capitulo[0],
      capitulo[1],
      capitulo[2],
      capitulo[3],
    ],
    relator: ministro[1],
    ministros_impedidos: [],
    ministros_suspeitos: [],
    envolvidos,
    suspensoes: [],
    vistas: [],
    destaques: []
  },

  {
    id:         3,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    cadeia:       'Terceiro Agravo',
    abreviacao: 'Ag-Ag-Ag',
    lista:      [
                  tagData[3],
                ],
    classe:     'ADI',
    id_tipo_recurso: 1,
    numero:     300,
    situacao:   3,
    tipo:       TipoDoProcesso.Merito,
    capitulos:  [
        capitulo[0],
        capitulo[1],
        capitulo[2],
        capitulo[3],
    ],
    relator: ministro[1],
    ministros_impedidos: [],
    ministros_suspeitos: [],
    envolvidos,
    suspensoes: [],
    vistas: [],
    destaques: []
  },

  {
    id:         4,
    ementa:     'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    cadeia:       'Quarto agravo',
    abreviacao: 'Ag-Ag-Ag-Ag',
    lista:      [
                  tagData[3],
                  tagData[2]
                ],
    classe:     'ADI',
    id_tipo_recurso: 1,
    numero:     300,
    situacao:   4,
    tipo:       TipoDoProcesso.Recurso,
    capitulos:  [
        capitulo[0],
        capitulo[1],
        capitulo[2],
        capitulo[3],
    ],
    relator: ministro[1],
    ministros_impedidos: [],
    ministros_suspeitos: [],
    envolvidos,
    suspensoes: [],
    vistas: [],
    destaques: []
  },

  {
    id:         5,
    cadeia:       'Tese',
    abreviacao: '',
    ementa:   'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    lista:        [
                  tagData[4],
                ],
    classe:     'RE',
    id_tipo_recurso: 1,
    numero:     1311742,
    situacao:   1,
    tipo:       TipoDoProcesso.Merito,
    capitulos:  [
      capitulo[4],
    ],
    relator: ministro[1],
    ministros_impedidos: [],
    ministros_suspeitos: [],
    envolvidos,
    suspensoes: [],
    vistas: [],
    destaques: [],
  },

  {
    id:         6,
    cadeia:       'Tese',
    abreviacao: '',
    ementa:   'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    lista:        [
                  tagData[4],
                ],
    classe:     'RE',
    id_tipo_recurso: 1,
    numero:     143255,
    situacao:   1,
    tipo:       TipoDoProcesso.Merito,
    capitulos:  [
      capitulo[5],
    ],
    relator: ministro[1],
    ministros_impedidos: [],
    ministros_suspeitos: [],
    envolvidos,
    suspensoes: [],
    vistas: [],
    destaques: [],
  },

  {
    id:         7,
    cadeia:       'Tese',
    abreviacao: '',
    ementa:   'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    lista:        [
                  tagData[0],
                ],
    classe:     'RE',
    id_tipo_recurso: 1,
    numero:     143255,
    situacao:   1,
    tipo:       TipoDoProcesso.Merito,
    capitulos:  [
      capitulo[4],
    ],
    relator: ministro[1],
    ministros_impedidos: [],
    ministros_suspeitos: [],
    envolvidos,
    suspensoes: [],
    vistas: [],
    destaques: []
  },

  {
    id:         8,
    cadeia:       'Tese',
    abreviacao: '',
    ementa:   'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    lista:        [
                  tagData[1],
                ],
    classe:     'RE',
    id_tipo_recurso: 1,
    numero:     142685,
    situacao:   1,
    tipo:       TipoDoProcesso.Merito,
    capitulos:  [
      capitulo[6],
    ],
    relator: ministro[1],
    ministros_impedidos: [],
    ministros_suspeitos: [],
    envolvidos,
    suspensoes: [],
    vistas: [],
    destaques: [],
  },

  {
    id:         9,
    ementa:     'AÇÃO DIRETA DE INCONSTITUCIONALIDADE 6.185 GOIÁS',
    cadeia:       'Embargo de Declaração',
    abreviacao: '',
    lista:      [
                  tagData[2],
                ],
    classe:     'ADI',
    id_tipo_recurso: 15,
    numero:     6185,
    situacao:   2,
    tipo:       TipoDoProcesso.Merito,
    capitulos:  [],
    relator: ministro[10],
    ministros_impedidos: [],
    ministros_suspeitos: [],
    envolvidos,
    suspensoes: [],
    vistas: [],
    destaques: [],
    redator: null,
  },

  {
    id: 123455,
    ementa: "Sessão de julgamento extraordinária para tratar da divisão de terras.",
    lista: [
      {
        descricao: "Semelhante a ADI 100",
        id: 123445,
        publica: false
      },
    ],
    classe: "ADI",
    numero: 100,
    cadeia: "Embargo de declaração",
    abreviacao: 'ED',
    situacao: SituacaoDoProcesso.Pautado,
    tipo: TipoDoProcesso.Merito,
    capitulos: [
      capitulo[1],
    ],
    ministros_impedidos: [],
    ministros_suspeitos: [],
    envolvidos,
    suspensoes: [],
    vistas: [],
    destaques: [],
  },

  {
    id: 123456,
    ementa: "Sessão de julgamento extraordinária para tratar da divisão de terras.",
    lista: [
      {
        descricao: "Semelhante a ADI 100",
        id: 123445,
        gestor: {
            numero: 19,
            criacao: '2021-08-02T03:00:00.000Z',
        },
        publica: false
      },
    ],
    classe: 'ADI',
    numero: 100,
    cadeia: 'Embargo de declaração',
    abreviacao: 'ED',
    situacao: SituacaoDoProcesso.Pautado,
    tipo: TipoDoProcesso.Merito,
    relator: ministro[10],
    redator: ministro[10],
    capitulos: [
      capitulo[1],
    ],
    ministros_impedidos: [],
    ministros_suspeitos: [],
    envolvidos,
    suspensoes: [],
    vistas: [],
    destaques: []
  },

  {
    id: 123457,
    ementa: 'Sessão de julgamento extraordinária para tratar da divisão de terras.',
    lista: [
      {
        descricao: 'Semelhante a ADI 100',
        id: 123445,
        gestor: {
            numero: 19,
            criacao: '2021-08-02T03:00:00.000Z',
        },
        publica: false
      },
    ],
    classe: 'ADI',
    numero: 100,
    cadeia: "Embargo de declaração",
    abreviacao: '',
    situacao: SituacaoDoProcesso.Pautado,
    tipo: TipoDoProcesso.Merito,
    capitulos: [
      capitulo[1],
    ],
    ministros_impedidos: [],
    ministros_suspeitos: [],
    envolvidos,
    suspensoes: [],
    vistas: [],
    destaques: []
  },
];

export const documentos: Documento[] = [
  {
    id: 4,
    nome: 'Relatório',
    tipo: 'pdf',
    status: 'Assinado',
    url: '/assets/pdf/relatorio-adi6185-Ed.pdf',
    textoSemFormatacao: "<html><head><style>p{margin-top:0pt;margin-bottom:1pt;}span.X392{font-size:9.0pt;font-weight:bold;color:#4f81bd;}span.X394{font-family:'Arial';font-size:20.0pt;}p.X395{margin-top:18.0pt;margin-bottom:10.0pt;}span.X395{font-family:'Arial';font-size:17.0pt;}span.X396{font-family:'Arial';font-size:17.0pt;}p.X397{margin-top:16.0pt;margin-bottom:10.0pt;}span.X397{font-family:'Arial';font-size:15.0pt;}span.X398{font-family:'Arial';font-size:15.0pt;}p.X399{margin-top:16.0pt;margin-bottom:10.0pt;}span.X399{font-family:'Arial';font-size:13.0pt;font-weight:bold;}span.X400{font-family:'Arial';font-size:13.0pt;font-weight:bold;}p.X401{margin-top:16.0pt;margin-bottom:10.0pt;}span.X401{font-family:'Arial';font-size:12.0pt;font-weight:bold;}span.X402{font-family:'Arial';font-size:12.0pt;font-weight:bold;}p.X403{margin-top:16.0pt;margin-bottom:10.0pt;}span.X403{font-family:'Arial';font-size:11.0pt;font-weight:bold;}span.X404{font-family:'Arial';font-size:11.0pt;font-weight:bold;}p.X405{margin-top:16.0pt;margin-bottom:10.0pt;}span.X405{font-family:'Arial';font-size:11.0pt;font-weight:bold;font-style:italic;}span.X406{font-family:'Arial';font-size:11.0pt;font-weight:bold;font-style:italic;}p.X407{margin-top:16.0pt;margin-bottom:10.0pt;}span.X407{font-family:'Arial';font-size:11.0pt;font-style:italic;}span.X408{font-family:'Arial';font-size:11.0pt;font-style:italic;}p.X409{margin-top:16.0pt;margin-bottom:10.0pt;}span.X409{font-family:'Arial';font-size:10.0pt;font-style:italic;}span.X410{font-family:'Arial';font-size:10.0pt;font-style:italic;}p.X411{margin-left:36.0pt;}p.X412{margin-top:0.0pt;margin-bottom:0.0pt;}span.X413{font-size:24.0pt;}span.X414{font-size:12.0pt;}p.X415{margin-left:36.0pt;margin-right:36.0pt;}span.X415{font-style:italic;}span.X416{font-style:italic;}p.X417{margin-left:36.0pt;margin-right:36.0pt;background-color:#f2f2f2;}span.X417{font-style:italic;}span.X418{font-style:italic;}p.X421{margin-bottom:0.0pt;}p.X422{margin-bottom:0.0pt;}p.X423{margin-bottom:0.0pt;}p.X424{margin-bottom:0.0pt;}p.X425{margin-bottom:0.0pt;}p.X426{margin-bottom:0.0pt;}p.X427{margin-bottom:0.0pt;}p.X428{margin-bottom:0.0pt;}p.X429{margin-bottom:0.0pt;}p.X430{margin-bottom:0.0pt;}p.X431{margin-bottom:0.0pt;}p.X432{margin-bottom:0.0pt;}p.X433{margin-bottom:0.0pt;}p.X434{margin-bottom:0.0pt;}p.X435{margin-bottom:0.0pt;}p.X436{margin-bottom:0.0pt;}p.X437{margin-bottom:0.0pt;}p.X438{margin-bottom:0.0pt;}p.X439{margin-bottom:0.0pt;}p.X440{margin-bottom:0.0pt;}p.X441{margin-bottom:0.0pt;}p.X442{margin-bottom:0.0pt;}p.X443{margin-bottom:0.0pt;}p.X444{margin-bottom:0.0pt;}p.X445{margin-bottom:0.0pt;}p.X446{margin-bottom:0.0pt;}p.X447{margin-bottom:0.0pt;}p.X448{margin-bottom:0.0pt;}p.X449{margin-bottom:0.0pt;}p.X450{margin-bottom:0.0pt;}p.X451{margin-bottom:0.0pt;}p.X452{margin-bottom:0.0pt;}p.X453{margin-bottom:0.0pt;}p.X454{margin-bottom:0.0pt;}p.X455{margin-bottom:0.0pt;}p.X456{margin-bottom:0.0pt;}p.X457{margin-bottom:0.0pt;}p.X458{margin-bottom:0.0pt;}p.X459{margin-bottom:0.0pt;}p.X460{margin-bottom:0.0pt;}p.X461{margin-bottom:0.0pt;}p.X462{margin-bottom:0.0pt;}p.X463{margin-bottom:0.0pt;}p.X464{margin-bottom:0.0pt;}p.X465{margin-bottom:0.0pt;}p.X466{margin-bottom:0.0pt;}p.X467{margin-bottom:0.0pt;}p.X468{margin-bottom:0.0pt;}p.X469{margin-bottom:0.0pt;}p.X470{margin-bottom:0.0pt;}p.X471{margin-bottom:0.0pt;}p.X472{margin-bottom:0.0pt;}p.X473{margin-bottom:0.0pt;}p.X474{margin-bottom:0.0pt;}p.X475{margin-bottom:0.0pt;}p.X476{margin-bottom:0.0pt;}p.X477{margin-bottom:0.0pt;}p.X478{margin-bottom:0.0pt;}p.X479{margin-bottom:0.0pt;}p.X480{margin-bottom:0.0pt;}p.X481{margin-bottom:0.0pt;}p.X482{margin-bottom:0.0pt;}p.X483{margin-bottom:0.0pt;}p.X484{margin-bottom:0.0pt;}p.X485{margin-bottom:0.0pt;}p.X486{margin-bottom:0.0pt;}p.X487{margin-bottom:0.0pt;}p.X488{margin-bottom:0.0pt;}p.X489{margin-bottom:0.0pt;}p.X490{margin-bottom:0.0pt;}p.X491{margin-bottom:0.0pt;}p.X492{margin-bottom:0.0pt;}p.X493{margin-bottom:0.0pt;}p.X494{margin-bottom:0.0pt;}p.X495{margin-bottom:0.0pt;}p.X496{margin-bottom:0.0pt;}p.X497{margin-bottom:0.0pt;}p.X498{margin-bottom:0.0pt;}p.X499{margin-bottom:0.0pt;}p.X500{margin-bottom:0.0pt;}p.X501{margin-bottom:0.0pt;}p.X502{margin-bottom:0.0pt;}p.X503{margin-bottom:0.0pt;}p.X504{margin-bottom:0.0pt;}p.X505{margin-bottom:0.0pt;}p.X506{margin-bottom:0.0pt;}p.X507{margin-bottom:0.0pt;}p.X508{margin-bottom:0.0pt;}p.X509{margin-bottom:0.0pt;}p.X510{margin-bottom:0.0pt;}p.X511{margin-bottom:0.0pt;}p.X512{margin-bottom:0.0pt;}p.X513{margin-bottom:0.0pt;}p.X514{margin-bottom:0.0pt;}p.X515{margin-bottom:0.0pt;}p.X516{margin-bottom:0.0pt;}p.X517{margin-bottom:0.0pt;}p.X518{margin-bottom:0.0pt;}p.X519{margin-bottom:0.0pt;}p.X520{margin-bottom:0.0pt;}p.X521{margin-bottom:0.0pt;}p.X522{margin-bottom:0.0pt;}p.X523{margin-bottom:0.0pt;}p.X524{margin-bottom:0.0pt;}p.X525{margin-bottom:0.0pt;}p.X526{margin-bottom:0.0pt;}span.X526{color:#404040;}p.X527{margin-bottom:0.0pt;}span.X527{color:#404040;}p.X528{margin-bottom:0.0pt;}span.X528{color:#404040;}p.X529{margin-bottom:0.0pt;}span.X529{color:#404040;}p.X530{margin-bottom:0.0pt;}span.X530{color:#404040;}p.X531{margin-bottom:0.0pt;}span.X531{color:#404040;}p.X532{margin-bottom:0.0pt;}span.X532{color:#404040;}p.X533{margin-bottom:0.0pt;}span.X533{color:#404040;}p.X534{margin-bottom:0.0pt;}span.X534{color:#404040;}p.X535{margin-bottom:0.0pt;}span.X535{color:#404040;}p.X536{margin-bottom:0.0pt;}span.X536{color:#404040;}p.X537{margin-bottom:0.0pt;}span.X537{color:#404040;}p.X538{margin-bottom:0.0pt;}span.X538{color:#404040;}p.X539{margin-bottom:0.0pt;}span.X539{color:#404040;}p.X540{margin-bottom:0.0pt;}p.X541{margin-bottom:0.0pt;}p.X542{margin-bottom:0.0pt;}p.X543{margin-bottom:0.0pt;}p.X544{margin-bottom:0.0pt;}p.X545{margin-bottom:0.0pt;}p.X546{margin-bottom:0.0pt;}span.X547{color:#0000ff;text-decoration:underline;}p.X548{margin-bottom:2.0pt;}span.X548{font-size:9.0pt;}span.X549{font-size:9.0pt;}p.X551{margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X552{margin-left:14.15pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X553{margin-left:28.35pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X554{margin-left:42.5pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X555{margin-left:56.7pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X556{margin-left:70.85pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X557{margin-left:85.05pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X558{margin-left:99.2pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X559{margin-left:113.4pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X561{text-align:justify;margin-top:0.0pt;margin-bottom:8.0pt;}span.X561{font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;}span.X562{font-size:16.0pt;font-weight:bold;}span.X564{color:#000080;text-decoration:underline;}p.X565{margin-top:0.0pt;margin-bottom:6.0pt;}p.X568{margin-top:12.0pt;margin-bottom:6.0pt;}span.X568{font-family:'Arial';font-size:14.0pt;}p.X569{margin-top:12.0pt;margin-bottom:6.0pt;}span.X569{font-family:'Arial';font-size:14.0pt;}p.X570{text-align:center;}span.X570{font-style:italic;}p.X571{margin-top:6.0pt;margin-bottom:6.0pt;}span.X571{font-size:12.0pt;font-style:italic;}p.X573{margin-left:0.0pt;margin-right:0.0pt;text-indent:0.3pt;margin-bottom:0.0pt;}span.X574{font-weight:bold;}p.X575{text-align:left;}p.X576{text-align:center;}span.X576{font-weight:bold;}p.X577{margin-left:0.0pt;margin-right:0.0pt;text-indent:28.35pt;margin-bottom:0.0pt;}p.X578{margin-left:85.05pt;margin-right:0.0pt;text-indent:28.35pt;}span.X578{font-size:12.0pt;}p.X579{margin-left:113.4pt;margin-right:0.0pt;text-indent:28.35pt;}span.X579{font-size:12.0pt;}p.X580{margin-left:141.75pt;margin-right:0.0pt;text-indent:28.35pt;}span.X580{font-size:12.0pt;}p.X581{margin-left:170.1pt;margin-right:0.0pt;text-indent:28.35pt;}span.X581{font-size:12.0pt;}p.X582{margin-left:198.45pt;margin-right:0.0pt;text-indent:28.35pt;}span.X582{font-size:12.0pt;}p.X583{text-align:center;margin-bottom:0.0pt;}p.X584{margin-left:170.1pt;margin-right:0.0pt;text-indent:0.0pt;}p.X585{text-align:center;}span.X585{font-size:12.0pt;font-style:italic;}p.X590{margin-bottom:5.0pt;}</style></head><body><div style=\"width:595.3pt;margin-bottom:56.7pt;margin-top:96.4pt;margin-left:113.4pt;margin-right:56.7pt;\"><p class=\"X561 X577\"><span class=\"X561 X577\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;font-weight:bold;color:#000000;white-space:pre-wrap;\">Despacho:</span></p><p class=\"X561 X577\"><span class=\"X561 X577\">Vistos.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\">A mat&eacute;ria constitucional suscitada no presente recurso extraordin&aacute;rio corresponde ao tema 1.167 da Gest&atilde;o por Temas da Repercuss&atilde;o Geral do portal do STF na </span><span class=\"X561 X577\" style=\"font-weight:bold;white-space:pre-wrap;\">internet</span><span class=\"X561 X577\">, cujo feito paradigma &eacute; o RE n&ordm; 1.314.490/SP.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\">Ante o exposto, nos termos do art. 328 do Regimento Interno do Supremo Tribunal Federal, determino a devolu&ccedil;&atilde;o dos autos &agrave; Corte de origem para aplica&ccedil;&atilde;o da sistem&aacute;tica da repercuss&atilde;o geral, nos termos dos incisos I a III do art. 1.030 do C&oacute;digo de Processo</span><span class=\"X561 X577\"> Civil.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Publique-se.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Bras&iacute;lia, 26 de outubro de 2021.</span></p><p style=\"margin-left:0.0pt;margin-right:0.0pt;text-indent:28.35pt;text-align:justify;margin-top:12.0pt;margin-bottom:0.0pt;white-space:pre-wrap;\"/><p class=\"X561 X583\"><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Ministro </span><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;font-weight:bold;color:#000000;white-space:pre-wrap;\">Dias Toffoli</span></p><p class=\"X561 X583\"><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Relator</span></p><p class=\"X561 X583\"><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;font-style:italic;color:#000000;white-space:pre-wrap;\">Documento assinado digitalmente</span></p><p class=\"X561 X583\"/></div></body></html>",
    data_criacao: '2016-08-29T09:12:33.001Z',
    data_modificacao: '2016-08-29T09:12:33.001Z',
  },

  {
    id: 5,
    nome: "Voto AM",
    tipo: "pdf",
    status: 'Assinado',
    url: "/assets/pdf/voto-alexandre-divergenteadi6185-Ed.pdf",
    textoSemFormatacao: "<html><head><style>p{margin-top:0pt;margin-bottom:1pt;}span.X392{font-size:9.0pt;font-weight:bold;color:#4f81bd;}span.X394{font-family:'Arial';font-size:20.0pt;}p.X395{margin-top:18.0pt;margin-bottom:10.0pt;}span.X395{font-family:'Arial';font-size:17.0pt;}span.X396{font-family:'Arial';font-size:17.0pt;}p.X397{margin-top:16.0pt;margin-bottom:10.0pt;}span.X397{font-family:'Arial';font-size:15.0pt;}span.X398{font-family:'Arial';font-size:15.0pt;}p.X399{margin-top:16.0pt;margin-bottom:10.0pt;}span.X399{font-family:'Arial';font-size:13.0pt;font-weight:bold;}span.X400{font-family:'Arial';font-size:13.0pt;font-weight:bold;}p.X401{margin-top:16.0pt;margin-bottom:10.0pt;}span.X401{font-family:'Arial';font-size:12.0pt;font-weight:bold;}span.X402{font-family:'Arial';font-size:12.0pt;font-weight:bold;}p.X403{margin-top:16.0pt;margin-bottom:10.0pt;}span.X403{font-family:'Arial';font-size:11.0pt;font-weight:bold;}span.X404{font-family:'Arial';font-size:11.0pt;font-weight:bold;}p.X405{margin-top:16.0pt;margin-bottom:10.0pt;}span.X405{font-family:'Arial';font-size:11.0pt;font-weight:bold;font-style:italic;}span.X406{font-family:'Arial';font-size:11.0pt;font-weight:bold;font-style:italic;}p.X407{margin-top:16.0pt;margin-bottom:10.0pt;}span.X407{font-family:'Arial';font-size:11.0pt;font-style:italic;}span.X408{font-family:'Arial';font-size:11.0pt;font-style:italic;}p.X409{margin-top:16.0pt;margin-bottom:10.0pt;}span.X409{font-family:'Arial';font-size:10.0pt;font-style:italic;}span.X410{font-family:'Arial';font-size:10.0pt;font-style:italic;}p.X411{margin-left:36.0pt;}p.X412{margin-top:0.0pt;margin-bottom:0.0pt;}span.X413{font-size:24.0pt;}span.X414{font-size:12.0pt;}p.X415{margin-left:36.0pt;margin-right:36.0pt;}span.X415{font-style:italic;}span.X416{font-style:italic;}p.X417{margin-left:36.0pt;margin-right:36.0pt;background-color:#f2f2f2;}span.X417{font-style:italic;}span.X418{font-style:italic;}p.X421{margin-bottom:0.0pt;}p.X422{margin-bottom:0.0pt;}p.X423{margin-bottom:0.0pt;}p.X424{margin-bottom:0.0pt;}p.X425{margin-bottom:0.0pt;}p.X426{margin-bottom:0.0pt;}p.X427{margin-bottom:0.0pt;}p.X428{margin-bottom:0.0pt;}p.X429{margin-bottom:0.0pt;}p.X430{margin-bottom:0.0pt;}p.X431{margin-bottom:0.0pt;}p.X432{margin-bottom:0.0pt;}p.X433{margin-bottom:0.0pt;}p.X434{margin-bottom:0.0pt;}p.X435{margin-bottom:0.0pt;}p.X436{margin-bottom:0.0pt;}p.X437{margin-bottom:0.0pt;}p.X438{margin-bottom:0.0pt;}p.X439{margin-bottom:0.0pt;}p.X440{margin-bottom:0.0pt;}p.X441{margin-bottom:0.0pt;}p.X442{margin-bottom:0.0pt;}p.X443{margin-bottom:0.0pt;}p.X444{margin-bottom:0.0pt;}p.X445{margin-bottom:0.0pt;}p.X446{margin-bottom:0.0pt;}p.X447{margin-bottom:0.0pt;}p.X448{margin-bottom:0.0pt;}p.X449{margin-bottom:0.0pt;}p.X450{margin-bottom:0.0pt;}p.X451{margin-bottom:0.0pt;}p.X452{margin-bottom:0.0pt;}p.X453{margin-bottom:0.0pt;}p.X454{margin-bottom:0.0pt;}p.X455{margin-bottom:0.0pt;}p.X456{margin-bottom:0.0pt;}p.X457{margin-bottom:0.0pt;}p.X458{margin-bottom:0.0pt;}p.X459{margin-bottom:0.0pt;}p.X460{margin-bottom:0.0pt;}p.X461{margin-bottom:0.0pt;}p.X462{margin-bottom:0.0pt;}p.X463{margin-bottom:0.0pt;}p.X464{margin-bottom:0.0pt;}p.X465{margin-bottom:0.0pt;}p.X466{margin-bottom:0.0pt;}p.X467{margin-bottom:0.0pt;}p.X468{margin-bottom:0.0pt;}p.X469{margin-bottom:0.0pt;}p.X470{margin-bottom:0.0pt;}p.X471{margin-bottom:0.0pt;}p.X472{margin-bottom:0.0pt;}p.X473{margin-bottom:0.0pt;}p.X474{margin-bottom:0.0pt;}p.X475{margin-bottom:0.0pt;}p.X476{margin-bottom:0.0pt;}p.X477{margin-bottom:0.0pt;}p.X478{margin-bottom:0.0pt;}p.X479{margin-bottom:0.0pt;}p.X480{margin-bottom:0.0pt;}p.X481{margin-bottom:0.0pt;}p.X482{margin-bottom:0.0pt;}p.X483{margin-bottom:0.0pt;}p.X484{margin-bottom:0.0pt;}p.X485{margin-bottom:0.0pt;}p.X486{margin-bottom:0.0pt;}p.X487{margin-bottom:0.0pt;}p.X488{margin-bottom:0.0pt;}p.X489{margin-bottom:0.0pt;}p.X490{margin-bottom:0.0pt;}p.X491{margin-bottom:0.0pt;}p.X492{margin-bottom:0.0pt;}p.X493{margin-bottom:0.0pt;}p.X494{margin-bottom:0.0pt;}p.X495{margin-bottom:0.0pt;}p.X496{margin-bottom:0.0pt;}p.X497{margin-bottom:0.0pt;}p.X498{margin-bottom:0.0pt;}p.X499{margin-bottom:0.0pt;}p.X500{margin-bottom:0.0pt;}p.X501{margin-bottom:0.0pt;}p.X502{margin-bottom:0.0pt;}p.X503{margin-bottom:0.0pt;}p.X504{margin-bottom:0.0pt;}p.X505{margin-bottom:0.0pt;}p.X506{margin-bottom:0.0pt;}p.X507{margin-bottom:0.0pt;}p.X508{margin-bottom:0.0pt;}p.X509{margin-bottom:0.0pt;}p.X510{margin-bottom:0.0pt;}p.X511{margin-bottom:0.0pt;}p.X512{margin-bottom:0.0pt;}p.X513{margin-bottom:0.0pt;}p.X514{margin-bottom:0.0pt;}p.X515{margin-bottom:0.0pt;}p.X516{margin-bottom:0.0pt;}p.X517{margin-bottom:0.0pt;}p.X518{margin-bottom:0.0pt;}p.X519{margin-bottom:0.0pt;}p.X520{margin-bottom:0.0pt;}p.X521{margin-bottom:0.0pt;}p.X522{margin-bottom:0.0pt;}p.X523{margin-bottom:0.0pt;}p.X524{margin-bottom:0.0pt;}p.X525{margin-bottom:0.0pt;}p.X526{margin-bottom:0.0pt;}span.X526{color:#404040;}p.X527{margin-bottom:0.0pt;}span.X527{color:#404040;}p.X528{margin-bottom:0.0pt;}span.X528{color:#404040;}p.X529{margin-bottom:0.0pt;}span.X529{color:#404040;}p.X530{margin-bottom:0.0pt;}span.X530{color:#404040;}p.X531{margin-bottom:0.0pt;}span.X531{color:#404040;}p.X532{margin-bottom:0.0pt;}span.X532{color:#404040;}p.X533{margin-bottom:0.0pt;}span.X533{color:#404040;}p.X534{margin-bottom:0.0pt;}span.X534{color:#404040;}p.X535{margin-bottom:0.0pt;}span.X535{color:#404040;}p.X536{margin-bottom:0.0pt;}span.X536{color:#404040;}p.X537{margin-bottom:0.0pt;}span.X537{color:#404040;}p.X538{margin-bottom:0.0pt;}span.X538{color:#404040;}p.X539{margin-bottom:0.0pt;}span.X539{color:#404040;}p.X540{margin-bottom:0.0pt;}p.X541{margin-bottom:0.0pt;}p.X542{margin-bottom:0.0pt;}p.X543{margin-bottom:0.0pt;}p.X544{margin-bottom:0.0pt;}p.X545{margin-bottom:0.0pt;}p.X546{margin-bottom:0.0pt;}span.X547{color:#0000ff;text-decoration:underline;}p.X548{margin-bottom:2.0pt;}span.X548{font-size:9.0pt;}span.X549{font-size:9.0pt;}p.X551{margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X552{margin-left:14.15pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X553{margin-left:28.35pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X554{margin-left:42.5pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X555{margin-left:56.7pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X556{margin-left:70.85pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X557{margin-left:85.05pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X558{margin-left:99.2pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X559{margin-left:113.4pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X561{text-align:justify;margin-top:0.0pt;margin-bottom:8.0pt;}span.X561{font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;}span.X562{font-size:16.0pt;font-weight:bold;}span.X564{color:#000080;text-decoration:underline;}p.X565{margin-top:0.0pt;margin-bottom:6.0pt;}p.X568{margin-top:12.0pt;margin-bottom:6.0pt;}span.X568{font-family:'Arial';font-size:14.0pt;}p.X569{margin-top:12.0pt;margin-bottom:6.0pt;}span.X569{font-family:'Arial';font-size:14.0pt;}p.X570{text-align:center;}span.X570{font-style:italic;}p.X571{margin-top:6.0pt;margin-bottom:6.0pt;}span.X571{font-size:12.0pt;font-style:italic;}p.X573{margin-left:0.0pt;margin-right:0.0pt;text-indent:0.3pt;margin-bottom:0.0pt;}span.X574{font-weight:bold;}p.X575{text-align:left;}p.X576{text-align:center;}span.X576{font-weight:bold;}p.X577{margin-left:0.0pt;margin-right:0.0pt;text-indent:28.35pt;margin-bottom:0.0pt;}p.X578{margin-left:85.05pt;margin-right:0.0pt;text-indent:28.35pt;}span.X578{font-size:12.0pt;}p.X579{margin-left:113.4pt;margin-right:0.0pt;text-indent:28.35pt;}span.X579{font-size:12.0pt;}p.X580{margin-left:141.75pt;margin-right:0.0pt;text-indent:28.35pt;}span.X580{font-size:12.0pt;}p.X581{margin-left:170.1pt;margin-right:0.0pt;text-indent:28.35pt;}span.X581{font-size:12.0pt;}p.X582{margin-left:198.45pt;margin-right:0.0pt;text-indent:28.35pt;}span.X582{font-size:12.0pt;}p.X583{text-align:center;margin-bottom:0.0pt;}p.X584{margin-left:170.1pt;margin-right:0.0pt;text-indent:0.0pt;}p.X585{text-align:center;}span.X585{font-size:12.0pt;font-style:italic;}p.X590{margin-bottom:5.0pt;}</style></head><body><div style=\"width:595.3pt;margin-bottom:56.7pt;margin-top:96.4pt;margin-left:113.4pt;margin-right:56.7pt;\"><p class=\"X561 X577\"><span class=\"X561 X577\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;font-weight:bold;color:#000000;white-space:pre-wrap;\">Despacho:</span></p><p class=\"X561 X577\"><span class=\"X561 X577\">Vistos.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\">A mat&eacute;ria constitucional suscitada no presente recurso extraordin&aacute;rio corresponde ao tema 1.167 da Gest&atilde;o por Temas da Repercuss&atilde;o Geral do portal do STF na </span><span class=\"X561 X577\" style=\"font-weight:bold;white-space:pre-wrap;\">internet</span><span class=\"X561 X577\">, cujo feito paradigma &eacute; o RE n&ordm; 1.314.490/SP.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\">Ante o exposto, nos termos do art. 328 do Regimento Interno do Supremo Tribunal Federal, determino a devolu&ccedil;&atilde;o dos autos &agrave; Corte de origem para aplica&ccedil;&atilde;o da sistem&aacute;tica da repercuss&atilde;o geral, nos termos dos incisos I a III do art. 1.030 do C&oacute;digo de Processo</span><span class=\"X561 X577\"> Civil.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Publique-se.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Bras&iacute;lia, 26 de outubro de 2021.</span></p><p style=\"margin-left:0.0pt;margin-right:0.0pt;text-indent:28.35pt;text-align:justify;margin-top:12.0pt;margin-bottom:0.0pt;white-space:pre-wrap;\"/><p class=\"X561 X583\"><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Ministro </span><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;font-weight:bold;color:#000000;white-space:pre-wrap;\">Dias Toffoli</span></p><p class=\"X561 X583\"><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Relator</span></p><p class=\"X561 X583\"><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;font-style:italic;color:#000000;white-space:pre-wrap;\">Documento assinado digitalmente</span></p><p class=\"X561 X583\"/></div></body></html>",
    data_criacao: '2016-08-29T09:12:33.001Z',
    data_modificacao: '2016-08-29T09:12:33.001Z',
  },

  {
    id: 6,
    nome: 'Voto RB',
    tipo: 'pdf',
    status: 'Assinado',
    url: '/assets/pdf/voto-luis-barroso-barroso-adi6185-Ed.pdf',
    textoSemFormatacao: "<html><head><style>p{margin-top:0pt;margin-bottom:1pt;}span.X392{font-size:9.0pt;font-weight:bold;color:#4f81bd;}span.X394{font-family:'Arial';font-size:20.0pt;}p.X395{margin-top:18.0pt;margin-bottom:10.0pt;}span.X395{font-family:'Arial';font-size:17.0pt;}span.X396{font-family:'Arial';font-size:17.0pt;}p.X397{margin-top:16.0pt;margin-bottom:10.0pt;}span.X397{font-family:'Arial';font-size:15.0pt;}span.X398{font-family:'Arial';font-size:15.0pt;}p.X399{margin-top:16.0pt;margin-bottom:10.0pt;}span.X399{font-family:'Arial';font-size:13.0pt;font-weight:bold;}span.X400{font-family:'Arial';font-size:13.0pt;font-weight:bold;}p.X401{margin-top:16.0pt;margin-bottom:10.0pt;}span.X401{font-family:'Arial';font-size:12.0pt;font-weight:bold;}span.X402{font-family:'Arial';font-size:12.0pt;font-weight:bold;}p.X403{margin-top:16.0pt;margin-bottom:10.0pt;}span.X403{font-family:'Arial';font-size:11.0pt;font-weight:bold;}span.X404{font-family:'Arial';font-size:11.0pt;font-weight:bold;}p.X405{margin-top:16.0pt;margin-bottom:10.0pt;}span.X405{font-family:'Arial';font-size:11.0pt;font-weight:bold;font-style:italic;}span.X406{font-family:'Arial';font-size:11.0pt;font-weight:bold;font-style:italic;}p.X407{margin-top:16.0pt;margin-bottom:10.0pt;}span.X407{font-family:'Arial';font-size:11.0pt;font-style:italic;}span.X408{font-family:'Arial';font-size:11.0pt;font-style:italic;}p.X409{margin-top:16.0pt;margin-bottom:10.0pt;}span.X409{font-family:'Arial';font-size:10.0pt;font-style:italic;}span.X410{font-family:'Arial';font-size:10.0pt;font-style:italic;}p.X411{margin-left:36.0pt;}p.X412{margin-top:0.0pt;margin-bottom:0.0pt;}span.X413{font-size:24.0pt;}span.X414{font-size:12.0pt;}p.X415{margin-left:36.0pt;margin-right:36.0pt;}span.X415{font-style:italic;}span.X416{font-style:italic;}p.X417{margin-left:36.0pt;margin-right:36.0pt;background-color:#f2f2f2;}span.X417{font-style:italic;}span.X418{font-style:italic;}p.X421{margin-bottom:0.0pt;}p.X422{margin-bottom:0.0pt;}p.X423{margin-bottom:0.0pt;}p.X424{margin-bottom:0.0pt;}p.X425{margin-bottom:0.0pt;}p.X426{margin-bottom:0.0pt;}p.X427{margin-bottom:0.0pt;}p.X428{margin-bottom:0.0pt;}p.X429{margin-bottom:0.0pt;}p.X430{margin-bottom:0.0pt;}p.X431{margin-bottom:0.0pt;}p.X432{margin-bottom:0.0pt;}p.X433{margin-bottom:0.0pt;}p.X434{margin-bottom:0.0pt;}p.X435{margin-bottom:0.0pt;}p.X436{margin-bottom:0.0pt;}p.X437{margin-bottom:0.0pt;}p.X438{margin-bottom:0.0pt;}p.X439{margin-bottom:0.0pt;}p.X440{margin-bottom:0.0pt;}p.X441{margin-bottom:0.0pt;}p.X442{margin-bottom:0.0pt;}p.X443{margin-bottom:0.0pt;}p.X444{margin-bottom:0.0pt;}p.X445{margin-bottom:0.0pt;}p.X446{margin-bottom:0.0pt;}p.X447{margin-bottom:0.0pt;}p.X448{margin-bottom:0.0pt;}p.X449{margin-bottom:0.0pt;}p.X450{margin-bottom:0.0pt;}p.X451{margin-bottom:0.0pt;}p.X452{margin-bottom:0.0pt;}p.X453{margin-bottom:0.0pt;}p.X454{margin-bottom:0.0pt;}p.X455{margin-bottom:0.0pt;}p.X456{margin-bottom:0.0pt;}p.X457{margin-bottom:0.0pt;}p.X458{margin-bottom:0.0pt;}p.X459{margin-bottom:0.0pt;}p.X460{margin-bottom:0.0pt;}p.X461{margin-bottom:0.0pt;}p.X462{margin-bottom:0.0pt;}p.X463{margin-bottom:0.0pt;}p.X464{margin-bottom:0.0pt;}p.X465{margin-bottom:0.0pt;}p.X466{margin-bottom:0.0pt;}p.X467{margin-bottom:0.0pt;}p.X468{margin-bottom:0.0pt;}p.X469{margin-bottom:0.0pt;}p.X470{margin-bottom:0.0pt;}p.X471{margin-bottom:0.0pt;}p.X472{margin-bottom:0.0pt;}p.X473{margin-bottom:0.0pt;}p.X474{margin-bottom:0.0pt;}p.X475{margin-bottom:0.0pt;}p.X476{margin-bottom:0.0pt;}p.X477{margin-bottom:0.0pt;}p.X478{margin-bottom:0.0pt;}p.X479{margin-bottom:0.0pt;}p.X480{margin-bottom:0.0pt;}p.X481{margin-bottom:0.0pt;}p.X482{margin-bottom:0.0pt;}p.X483{margin-bottom:0.0pt;}p.X484{margin-bottom:0.0pt;}p.X485{margin-bottom:0.0pt;}p.X486{margin-bottom:0.0pt;}p.X487{margin-bottom:0.0pt;}p.X488{margin-bottom:0.0pt;}p.X489{margin-bottom:0.0pt;}p.X490{margin-bottom:0.0pt;}p.X491{margin-bottom:0.0pt;}p.X492{margin-bottom:0.0pt;}p.X493{margin-bottom:0.0pt;}p.X494{margin-bottom:0.0pt;}p.X495{margin-bottom:0.0pt;}p.X496{margin-bottom:0.0pt;}p.X497{margin-bottom:0.0pt;}p.X498{margin-bottom:0.0pt;}p.X499{margin-bottom:0.0pt;}p.X500{margin-bottom:0.0pt;}p.X501{margin-bottom:0.0pt;}p.X502{margin-bottom:0.0pt;}p.X503{margin-bottom:0.0pt;}p.X504{margin-bottom:0.0pt;}p.X505{margin-bottom:0.0pt;}p.X506{margin-bottom:0.0pt;}p.X507{margin-bottom:0.0pt;}p.X508{margin-bottom:0.0pt;}p.X509{margin-bottom:0.0pt;}p.X510{margin-bottom:0.0pt;}p.X511{margin-bottom:0.0pt;}p.X512{margin-bottom:0.0pt;}p.X513{margin-bottom:0.0pt;}p.X514{margin-bottom:0.0pt;}p.X515{margin-bottom:0.0pt;}p.X516{margin-bottom:0.0pt;}p.X517{margin-bottom:0.0pt;}p.X518{margin-bottom:0.0pt;}p.X519{margin-bottom:0.0pt;}p.X520{margin-bottom:0.0pt;}p.X521{margin-bottom:0.0pt;}p.X522{margin-bottom:0.0pt;}p.X523{margin-bottom:0.0pt;}p.X524{margin-bottom:0.0pt;}p.X525{margin-bottom:0.0pt;}p.X526{margin-bottom:0.0pt;}span.X526{color:#404040;}p.X527{margin-bottom:0.0pt;}span.X527{color:#404040;}p.X528{margin-bottom:0.0pt;}span.X528{color:#404040;}p.X529{margin-bottom:0.0pt;}span.X529{color:#404040;}p.X530{margin-bottom:0.0pt;}span.X530{color:#404040;}p.X531{margin-bottom:0.0pt;}span.X531{color:#404040;}p.X532{margin-bottom:0.0pt;}span.X532{color:#404040;}p.X533{margin-bottom:0.0pt;}span.X533{color:#404040;}p.X534{margin-bottom:0.0pt;}span.X534{color:#404040;}p.X535{margin-bottom:0.0pt;}span.X535{color:#404040;}p.X536{margin-bottom:0.0pt;}span.X536{color:#404040;}p.X537{margin-bottom:0.0pt;}span.X537{color:#404040;}p.X538{margin-bottom:0.0pt;}span.X538{color:#404040;}p.X539{margin-bottom:0.0pt;}span.X539{color:#404040;}p.X540{margin-bottom:0.0pt;}p.X541{margin-bottom:0.0pt;}p.X542{margin-bottom:0.0pt;}p.X543{margin-bottom:0.0pt;}p.X544{margin-bottom:0.0pt;}p.X545{margin-bottom:0.0pt;}p.X546{margin-bottom:0.0pt;}span.X547{color:#0000ff;text-decoration:underline;}p.X548{margin-bottom:2.0pt;}span.X548{font-size:9.0pt;}span.X549{font-size:9.0pt;}p.X551{margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X552{margin-left:14.15pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X553{margin-left:28.35pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X554{margin-left:42.5pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X555{margin-left:56.7pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X556{margin-left:70.85pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X557{margin-left:85.05pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X558{margin-left:99.2pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X559{margin-left:113.4pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X561{text-align:justify;margin-top:0.0pt;margin-bottom:8.0pt;}span.X561{font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;}span.X562{font-size:16.0pt;font-weight:bold;}span.X564{color:#000080;text-decoration:underline;}p.X565{margin-top:0.0pt;margin-bottom:6.0pt;}p.X568{margin-top:12.0pt;margin-bottom:6.0pt;}span.X568{font-family:'Arial';font-size:14.0pt;}p.X569{margin-top:12.0pt;margin-bottom:6.0pt;}span.X569{font-family:'Arial';font-size:14.0pt;}p.X570{text-align:center;}span.X570{font-style:italic;}p.X571{margin-top:6.0pt;margin-bottom:6.0pt;}span.X571{font-size:12.0pt;font-style:italic;}p.X573{margin-left:0.0pt;margin-right:0.0pt;text-indent:0.3pt;margin-bottom:0.0pt;}span.X574{font-weight:bold;}p.X575{text-align:left;}p.X576{text-align:center;}span.X576{font-weight:bold;}p.X577{margin-left:0.0pt;margin-right:0.0pt;text-indent:28.35pt;margin-bottom:0.0pt;}p.X578{margin-left:85.05pt;margin-right:0.0pt;text-indent:28.35pt;}span.X578{font-size:12.0pt;}p.X579{margin-left:113.4pt;margin-right:0.0pt;text-indent:28.35pt;}span.X579{font-size:12.0pt;}p.X580{margin-left:141.75pt;margin-right:0.0pt;text-indent:28.35pt;}span.X580{font-size:12.0pt;}p.X581{margin-left:170.1pt;margin-right:0.0pt;text-indent:28.35pt;}span.X581{font-size:12.0pt;}p.X582{margin-left:198.45pt;margin-right:0.0pt;text-indent:28.35pt;}span.X582{font-size:12.0pt;}p.X583{text-align:center;margin-bottom:0.0pt;}p.X584{margin-left:170.1pt;margin-right:0.0pt;text-indent:0.0pt;}p.X585{text-align:center;}span.X585{font-size:12.0pt;font-style:italic;}p.X590{margin-bottom:5.0pt;}</style></head><body><div style=\"width:595.3pt;margin-bottom:56.7pt;margin-top:96.4pt;margin-left:113.4pt;margin-right:56.7pt;\"><p class=\"X561 X577\"><span class=\"X561 X577\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;font-weight:bold;color:#000000;white-space:pre-wrap;\">Despacho:</span></p><p class=\"X561 X577\"><span class=\"X561 X577\">Vistos.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\">A mat&eacute;ria constitucional suscitada no presente recurso extraordin&aacute;rio corresponde ao tema 1.167 da Gest&atilde;o por Temas da Repercuss&atilde;o Geral do portal do STF na </span><span class=\"X561 X577\" style=\"font-weight:bold;white-space:pre-wrap;\">internet</span><span class=\"X561 X577\">, cujo feito paradigma &eacute; o RE n&ordm; 1.314.490/SP.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\">Ante o exposto, nos termos do art. 328 do Regimento Interno do Supremo Tribunal Federal, determino a devolu&ccedil;&atilde;o dos autos &agrave; Corte de origem para aplica&ccedil;&atilde;o da sistem&aacute;tica da repercuss&atilde;o geral, nos termos dos incisos I a III do art. 1.030 do C&oacute;digo de Processo</span><span class=\"X561 X577\"> Civil.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Publique-se.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Bras&iacute;lia, 26 de outubro de 2021.</span></p><p style=\"margin-left:0.0pt;margin-right:0.0pt;text-indent:28.35pt;text-align:justify;margin-top:12.0pt;margin-bottom:0.0pt;white-space:pre-wrap;\"/><p class=\"X561 X583\"><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Ministro </span><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;font-weight:bold;color:#000000;white-space:pre-wrap;\">Dias Toffoli</span></p><p class=\"X561 X583\"><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Relator</span></p><p class=\"X561 X583\"><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;font-style:italic;color:#000000;white-space:pre-wrap;\">Documento assinado digitalmente</span></p><p class=\"X561 X583\"/></div></body></html>",
    data_criacao: '2016-08-29T09:12:33.001Z',
    data_modificacao: '2016-08-29T09:12:33.001Z',
  },

  {
    id: 7,
    nome: 'Voto MA',
    tipo: 'pdf',
    status: 'Assinado',
    url: '/assets/pdf/voto-marco-aurelio-relator-adi6185-Ed.pdf',
    textoSemFormatacao: "<html><head><style>p{margin-top:0pt;margin-bottom:1pt;}span.X392{font-size:9.0pt;font-weight:bold;color:#4f81bd;}span.X394{font-family:'Arial';font-size:20.0pt;}p.X395{margin-top:18.0pt;margin-bottom:10.0pt;}span.X395{font-family:'Arial';font-size:17.0pt;}span.X396{font-family:'Arial';font-size:17.0pt;}p.X397{margin-top:16.0pt;margin-bottom:10.0pt;}span.X397{font-family:'Arial';font-size:15.0pt;}span.X398{font-family:'Arial';font-size:15.0pt;}p.X399{margin-top:16.0pt;margin-bottom:10.0pt;}span.X399{font-family:'Arial';font-size:13.0pt;font-weight:bold;}span.X400{font-family:'Arial';font-size:13.0pt;font-weight:bold;}p.X401{margin-top:16.0pt;margin-bottom:10.0pt;}span.X401{font-family:'Arial';font-size:12.0pt;font-weight:bold;}span.X402{font-family:'Arial';font-size:12.0pt;font-weight:bold;}p.X403{margin-top:16.0pt;margin-bottom:10.0pt;}span.X403{font-family:'Arial';font-size:11.0pt;font-weight:bold;}span.X404{font-family:'Arial';font-size:11.0pt;font-weight:bold;}p.X405{margin-top:16.0pt;margin-bottom:10.0pt;}span.X405{font-family:'Arial';font-size:11.0pt;font-weight:bold;font-style:italic;}span.X406{font-family:'Arial';font-size:11.0pt;font-weight:bold;font-style:italic;}p.X407{margin-top:16.0pt;margin-bottom:10.0pt;}span.X407{font-family:'Arial';font-size:11.0pt;font-style:italic;}span.X408{font-family:'Arial';font-size:11.0pt;font-style:italic;}p.X409{margin-top:16.0pt;margin-bottom:10.0pt;}span.X409{font-family:'Arial';font-size:10.0pt;font-style:italic;}span.X410{font-family:'Arial';font-size:10.0pt;font-style:italic;}p.X411{margin-left:36.0pt;}p.X412{margin-top:0.0pt;margin-bottom:0.0pt;}span.X413{font-size:24.0pt;}span.X414{font-size:12.0pt;}p.X415{margin-left:36.0pt;margin-right:36.0pt;}span.X415{font-style:italic;}span.X416{font-style:italic;}p.X417{margin-left:36.0pt;margin-right:36.0pt;background-color:#f2f2f2;}span.X417{font-style:italic;}span.X418{font-style:italic;}p.X421{margin-bottom:0.0pt;}p.X422{margin-bottom:0.0pt;}p.X423{margin-bottom:0.0pt;}p.X424{margin-bottom:0.0pt;}p.X425{margin-bottom:0.0pt;}p.X426{margin-bottom:0.0pt;}p.X427{margin-bottom:0.0pt;}p.X428{margin-bottom:0.0pt;}p.X429{margin-bottom:0.0pt;}p.X430{margin-bottom:0.0pt;}p.X431{margin-bottom:0.0pt;}p.X432{margin-bottom:0.0pt;}p.X433{margin-bottom:0.0pt;}p.X434{margin-bottom:0.0pt;}p.X435{margin-bottom:0.0pt;}p.X436{margin-bottom:0.0pt;}p.X437{margin-bottom:0.0pt;}p.X438{margin-bottom:0.0pt;}p.X439{margin-bottom:0.0pt;}p.X440{margin-bottom:0.0pt;}p.X441{margin-bottom:0.0pt;}p.X442{margin-bottom:0.0pt;}p.X443{margin-bottom:0.0pt;}p.X444{margin-bottom:0.0pt;}p.X445{margin-bottom:0.0pt;}p.X446{margin-bottom:0.0pt;}p.X447{margin-bottom:0.0pt;}p.X448{margin-bottom:0.0pt;}p.X449{margin-bottom:0.0pt;}p.X450{margin-bottom:0.0pt;}p.X451{margin-bottom:0.0pt;}p.X452{margin-bottom:0.0pt;}p.X453{margin-bottom:0.0pt;}p.X454{margin-bottom:0.0pt;}p.X455{margin-bottom:0.0pt;}p.X456{margin-bottom:0.0pt;}p.X457{margin-bottom:0.0pt;}p.X458{margin-bottom:0.0pt;}p.X459{margin-bottom:0.0pt;}p.X460{margin-bottom:0.0pt;}p.X461{margin-bottom:0.0pt;}p.X462{margin-bottom:0.0pt;}p.X463{margin-bottom:0.0pt;}p.X464{margin-bottom:0.0pt;}p.X465{margin-bottom:0.0pt;}p.X466{margin-bottom:0.0pt;}p.X467{margin-bottom:0.0pt;}p.X468{margin-bottom:0.0pt;}p.X469{margin-bottom:0.0pt;}p.X470{margin-bottom:0.0pt;}p.X471{margin-bottom:0.0pt;}p.X472{margin-bottom:0.0pt;}p.X473{margin-bottom:0.0pt;}p.X474{margin-bottom:0.0pt;}p.X475{margin-bottom:0.0pt;}p.X476{margin-bottom:0.0pt;}p.X477{margin-bottom:0.0pt;}p.X478{margin-bottom:0.0pt;}p.X479{margin-bottom:0.0pt;}p.X480{margin-bottom:0.0pt;}p.X481{margin-bottom:0.0pt;}p.X482{margin-bottom:0.0pt;}p.X483{margin-bottom:0.0pt;}p.X484{margin-bottom:0.0pt;}p.X485{margin-bottom:0.0pt;}p.X486{margin-bottom:0.0pt;}p.X487{margin-bottom:0.0pt;}p.X488{margin-bottom:0.0pt;}p.X489{margin-bottom:0.0pt;}p.X490{margin-bottom:0.0pt;}p.X491{margin-bottom:0.0pt;}p.X492{margin-bottom:0.0pt;}p.X493{margin-bottom:0.0pt;}p.X494{margin-bottom:0.0pt;}p.X495{margin-bottom:0.0pt;}p.X496{margin-bottom:0.0pt;}p.X497{margin-bottom:0.0pt;}p.X498{margin-bottom:0.0pt;}p.X499{margin-bottom:0.0pt;}p.X500{margin-bottom:0.0pt;}p.X501{margin-bottom:0.0pt;}p.X502{margin-bottom:0.0pt;}p.X503{margin-bottom:0.0pt;}p.X504{margin-bottom:0.0pt;}p.X505{margin-bottom:0.0pt;}p.X506{margin-bottom:0.0pt;}p.X507{margin-bottom:0.0pt;}p.X508{margin-bottom:0.0pt;}p.X509{margin-bottom:0.0pt;}p.X510{margin-bottom:0.0pt;}p.X511{margin-bottom:0.0pt;}p.X512{margin-bottom:0.0pt;}p.X513{margin-bottom:0.0pt;}p.X514{margin-bottom:0.0pt;}p.X515{margin-bottom:0.0pt;}p.X516{margin-bottom:0.0pt;}p.X517{margin-bottom:0.0pt;}p.X518{margin-bottom:0.0pt;}p.X519{margin-bottom:0.0pt;}p.X520{margin-bottom:0.0pt;}p.X521{margin-bottom:0.0pt;}p.X522{margin-bottom:0.0pt;}p.X523{margin-bottom:0.0pt;}p.X524{margin-bottom:0.0pt;}p.X525{margin-bottom:0.0pt;}p.X526{margin-bottom:0.0pt;}span.X526{color:#404040;}p.X527{margin-bottom:0.0pt;}span.X527{color:#404040;}p.X528{margin-bottom:0.0pt;}span.X528{color:#404040;}p.X529{margin-bottom:0.0pt;}span.X529{color:#404040;}p.X530{margin-bottom:0.0pt;}span.X530{color:#404040;}p.X531{margin-bottom:0.0pt;}span.X531{color:#404040;}p.X532{margin-bottom:0.0pt;}span.X532{color:#404040;}p.X533{margin-bottom:0.0pt;}span.X533{color:#404040;}p.X534{margin-bottom:0.0pt;}span.X534{color:#404040;}p.X535{margin-bottom:0.0pt;}span.X535{color:#404040;}p.X536{margin-bottom:0.0pt;}span.X536{color:#404040;}p.X537{margin-bottom:0.0pt;}span.X537{color:#404040;}p.X538{margin-bottom:0.0pt;}span.X538{color:#404040;}p.X539{margin-bottom:0.0pt;}span.X539{color:#404040;}p.X540{margin-bottom:0.0pt;}p.X541{margin-bottom:0.0pt;}p.X542{margin-bottom:0.0pt;}p.X543{margin-bottom:0.0pt;}p.X544{margin-bottom:0.0pt;}p.X545{margin-bottom:0.0pt;}p.X546{margin-bottom:0.0pt;}span.X547{color:#0000ff;text-decoration:underline;}p.X548{margin-bottom:2.0pt;}span.X548{font-size:9.0pt;}span.X549{font-size:9.0pt;}p.X551{margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X552{margin-left:14.15pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X553{margin-left:28.35pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X554{margin-left:42.5pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X555{margin-left:56.7pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X556{margin-left:70.85pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X557{margin-left:85.05pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X558{margin-left:99.2pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X559{margin-left:113.4pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X561{text-align:justify;margin-top:0.0pt;margin-bottom:8.0pt;}span.X561{font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;}span.X562{font-size:16.0pt;font-weight:bold;}span.X564{color:#000080;text-decoration:underline;}p.X565{margin-top:0.0pt;margin-bottom:6.0pt;}p.X568{margin-top:12.0pt;margin-bottom:6.0pt;}span.X568{font-family:'Arial';font-size:14.0pt;}p.X569{margin-top:12.0pt;margin-bottom:6.0pt;}span.X569{font-family:'Arial';font-size:14.0pt;}p.X570{text-align:center;}span.X570{font-style:italic;}p.X571{margin-top:6.0pt;margin-bottom:6.0pt;}span.X571{font-size:12.0pt;font-style:italic;}p.X573{margin-left:0.0pt;margin-right:0.0pt;text-indent:0.3pt;margin-bottom:0.0pt;}span.X574{font-weight:bold;}p.X575{text-align:left;}p.X576{text-align:center;}span.X576{font-weight:bold;}p.X577{margin-left:0.0pt;margin-right:0.0pt;text-indent:28.35pt;margin-bottom:0.0pt;}p.X578{margin-left:85.05pt;margin-right:0.0pt;text-indent:28.35pt;}span.X578{font-size:12.0pt;}p.X579{margin-left:113.4pt;margin-right:0.0pt;text-indent:28.35pt;}span.X579{font-size:12.0pt;}p.X580{margin-left:141.75pt;margin-right:0.0pt;text-indent:28.35pt;}span.X580{font-size:12.0pt;}p.X581{margin-left:170.1pt;margin-right:0.0pt;text-indent:28.35pt;}span.X581{font-size:12.0pt;}p.X582{margin-left:198.45pt;margin-right:0.0pt;text-indent:28.35pt;}span.X582{font-size:12.0pt;}p.X583{text-align:center;margin-bottom:0.0pt;}p.X584{margin-left:170.1pt;margin-right:0.0pt;text-indent:0.0pt;}p.X585{text-align:center;}span.X585{font-size:12.0pt;font-style:italic;}p.X590{margin-bottom:5.0pt;}</style></head><body><div style=\"width:595.3pt;margin-bottom:56.7pt;margin-top:96.4pt;margin-left:113.4pt;margin-right:56.7pt;\"><p class=\"X561 X577\"><span class=\"X561 X577\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;font-weight:bold;color:#000000;white-space:pre-wrap;\">Despacho:</span></p><p class=\"X561 X577\"><span class=\"X561 X577\">Vistos.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\">A mat&eacute;ria constitucional suscitada no presente recurso extraordin&aacute;rio corresponde ao tema 1.167 da Gest&atilde;o por Temas da Repercuss&atilde;o Geral do portal do STF na </span><span class=\"X561 X577\" style=\"font-weight:bold;white-space:pre-wrap;\">internet</span><span class=\"X561 X577\">, cujo feito paradigma &eacute; o RE n&ordm; 1.314.490/SP.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\">Ante o exposto, nos termos do art. 328 do Regimento Interno do Supremo Tribunal Federal, determino a devolu&ccedil;&atilde;o dos autos &agrave; Corte de origem para aplica&ccedil;&atilde;o da sistem&aacute;tica da repercuss&atilde;o geral, nos termos dos incisos I a III do art. 1.030 do C&oacute;digo de Processo</span><span class=\"X561 X577\"> Civil.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Publique-se.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Bras&iacute;lia, 26 de outubro de 2021.</span></p><p style=\"margin-left:0.0pt;margin-right:0.0pt;text-indent:28.35pt;text-align:justify;margin-top:12.0pt;margin-bottom:0.0pt;white-space:pre-wrap;\"/><p class=\"X561 X583\"><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Ministro </span><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;font-weight:bold;color:#000000;white-space:pre-wrap;\">Dias Toffoli</span></p><p class=\"X561 X583\"><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Relator</span></p><p class=\"X561 X583\"><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;font-style:italic;color:#000000;white-space:pre-wrap;\">Documento assinado digitalmente</span></p><p class=\"X561 X583\"/></div></body></html>",
    data_criacao: '2016-08-29T09:12:33.001Z',
    data_modificacao: '2016-08-29T09:12:33.001Z',
  },
]

export const votos: Voto[] = [
  {
    id:             1,
    situacao:       'situacao',
    nome:           'nome',
    conteudo:       '<\x00h\x002\x00>\x00V\x00o\x00t\x00o\x00<\x00/\x00h\x002\x00>\x00\n\x00<\x00p\x00 \x00c\x00l\x00a\x00s\x00s\x00=\x00"\x00w\x00h\x00i\x00t\x00e\x00s\x00p\x00a\x00c\x00e\x00-\x00p\x00r\x00e\x00-\x00l\x00i\x00n\x00e\x00"\x00>\x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00\n\x001\x00.\x00\n\x00T\x00r\x00a\x00t\x00a\x00-\x00s\x00e\x00 \x00 \x00 \x00d\x00e\x00 \x00 \x00 \x00e\x00m\x00b\x00a\x00r\x00g\x00o\x00s\x00 \x00 \x00 \x00d\x00e\x00 \x00 \x00 \x00d\x00e\x00c\x00l\x00a\x00r\x00a\x00ç\x00ã\x00o\x00 \x00 \x00 \x00o\x00p\x00o\x00s\x00t\x00o\x00s\x00 \x00 \x00 \x00e\x00m\x00 \x00 \x00 \x00f\x00a\x00c\x00e\x00 \x00 \x00 \x00d\x00e\x00\n\x00a\x00c\x00ó\x00r\x00d\x00ã\x00o\x00 \x00d\x00o\x00 \x00P\x00l\x00e\x00n\x00á\x00r\x00i\x00o\x00 \x00d\x00e\x00s\x00t\x00a\x00 \x00C\x00o\x00r\x00t\x00e\x00 \x00d\x00a\x00 \x00r\x00e\x00l\x00a\x00t\x00o\x00r\x00i\x00a\x00 \x00d\x00o\x00 \x00M\x00i\x00n\x00i\x00s\x00t\x00r\x00o\x00 \x00M\x00a\x00r\x00c\x00o\x00 \x00A\x00u\x00r\x00é\x00l\x00i\x00o\x00p\x00e\x00l\x00o\x00 \x00 \x00 \x00q\x00u\x00a\x00l\x00 \x00 \x00 \x00f\x00o\x00i\x00 \x00 \x00 \x00j\x00u\x00l\x00g\x00a\x00d\x00a\x00 \x00 \x00 \x00p\x00r\x00o\x00c\x00e\x00d\x00e\x00n\x00t\x00e\x00 \x00 \x00 \x00a\x00ç\x00ã\x00o\x00 \x00 \x00 \x00d\x00i\x00r\x00e\x00t\x00a\x00 \x00 \x00 \x00d\x00e\x00 \x00 \x00 \x00i\x00n\x00c\x00o\x00n\x00s\x00t\x00i\x00t\x00u\x00c\x00i\x00o\x00n\x00a\x00l\x00i\x00d\x00a\x00d\x00e\x00\n\x00p\x00r\x00o\x00p\x00o\x00s\x00t\x00a\x00 \x00e\x00m\x00 \x00f\x00a\x00c\x00e\x00 \x00d\x00o\x00 \x00a\x00r\x00t\x00.\x00 \x003\x00º\x00 \x00d\x00a\x00 \x00L\x00e\x00i\x00 \x00n\x00º\x00 \x001\x009\x00.\x009\x002\x009\x00/\x002\x000\x001\x007\x00 \x00d\x00o\x00 \x00E\x00s\x00t\x00a\x00d\x00o\x00 \x00d\x00e\x00 \x00G\x00o\x00i\x00á\x00s\x00,\x00 \x00q\x00u\x00e\x00\n\x00f\x00i\x00x\x00o\x00u\x00,\x00 \x00d\x00e\x00 \x00f\x00o\x00r\x00m\x00a\x00 \x00g\x00e\x00n\x00é\x00r\x00i\x00c\x00a\x00,\x00 \x00o\x00s\x00 \x00v\x00e\x00n\x00c\x00i\x00m\x00e\x00n\x00t\x00o\x00s\x00 \x00e\x00 \x00s\x00u\x00b\x00s\x00í\x00d\x00i\x00o\x00s\x00 \x00d\x00o\x00s\x00 \x00\x1C \n\x00o\x00c\x00u\x00p\x00a\x00n\x00t\x00e\x00s\x00 \x00d\x00e\x00\n\x00c\x00a\x00r\x00g\x00o\x00s\x00 \x00 \x00 \x00e\x00 \x00 \x00 \x00e\x00m\x00p\x00r\x00e\x00g\x00a\x00d\x00o\x00s\x00 \x00 \x00 \x00p\x00ú\x00b\x00l\x00i\x00c\x00o\x00s\x00 \x00 \x00 \x00d\x00e\x00 \x00 \x00 \x00A\x00d\x00v\x00o\x00g\x00a\x00d\x00o\x00 \x00 \x00 \x00e\x00 \x00 \x00 \x00c\x00o\x00r\x00r\x00e\x00l\x00a\x00t\x00o\x00s\x00 \x00 \x00 \x00e\x00s\x00p\x00e\x00c\x00í\x00f\x00i\x00c\x00o\x00s\x00 \x00 \x00 \x00d\x00a\x00 \x00 \x00 \x00á\x00r\x00e\x00a\x00\n\x00j\x00u\x00r\x00í\x00d\x00i\x00c\x00a\x00 \x00d\x00a\x00s\x00 \x00a\x00u\x00t\x00a\x00r\x00q\x00u\x00i\x00a\x00s\x00 \x00e\x00s\x00t\x00a\x00d\x00u\x00a\x00i\x00s\x00\x1D ,\x00 \x00\n\x00p\x00o\x00r\x00 \x00a\x00f\x00r\x00o\x00n\x00t\x00a\x00 \x00à\x00 \x00p\x00r\x00e\x00v\x00i\x00s\x00ã\x00o\x00 \x00c\x00o\x00n\x00s\x00t\x00i\x00t\x00u\x00c\x00i\x00o\x00n\x00a\x00l\x00 \x00d\x00e\x00\n\x00r\x00e\x00s\x00e\x00r\x00v\x00a\x00 \x00d\x00e\x00 \x00l\x00e\x00i\x00 \x00e\x00s\x00p\x00e\x00c\x00í\x00f\x00i\x00c\x00a\x00 \x00(\x00a\x00r\x00t\x00.\x00 \x003\x007\x00,\x00 \x00X\x00)\x00 \x00e\x00 \x00v\x00e\x00d\x00a\x00ç\x00ã\x00o\x00 \x00à\x00 \x00v\x00i\x00n\x00c\x00u\x00l\x00a\x00ç\x00ã\x00o\x00 \x00r\x00e\x00m\x00u\x00n\x00e\x00r\x00a\x00t\x00ó\x00r\x00i\x00a\x00\n\x00e\x00n\x00t\x00r\x00e\x00 \x00i\x00n\x00t\x00e\x00g\x00r\x00a\x00n\x00t\x00e\x00s\x00 \x00d\x00e\x00 \x00c\x00a\x00r\x00r\x00e\x00i\x00r\x00a\x00s\x00 \x00d\x00i\x00v\x00e\x00r\x00s\x00a\x00s\x00 \x00(\x00a\x00r\x00t\x00.\x00 \x003\x007\x00,\x00 \x00X\x00I\x00I\x00I\x00,\x00 \x00e\x00 \x00a\x00r\x00t\x00.\x00 \x003\x009\x00,\x00 \x00§\x00 \x001\x00º\x00)\x00.\x00 \x00\n\x00\n\x002\x00.\x00\n\x00O\x00 \x00 \x00 \x00P\x00r\x00e\x00s\x00i\x00d\x00e\x00n\x00t\x00e\x00 \x00 \x00 \x00d\x00a\x00 \x00 \x00 \x00A\x00s\x00s\x00e\x00m\x00b\x00l\x00e\x00i\x00a\x00 \x00 \x00 \x00L\x00e\x00g\x00i\x00s\x00l\x00a\x00t\x00i\x00v\x00a\x00 \x00 \x00 \x00d\x00o\x00 \x00 \x00 \x00E\x00s\x00t\x00a\x00d\x00o\x00 \x00 \x00 \x00d\x00e\x00\n\x00G\x00o\x00i\x00á\x00s\x00 \x00o\x00p\x00ô\x00s\x00 \x00o\x00s\x00 \x00p\x00r\x00e\x00s\x00e\x00n\x00t\x00e\x00s\x00 \x00e\x00m\x00b\x00a\x00r\x00g\x00o\x00s\x00 \x00d\x00e\x00 \x00d\x00e\x00c\x00l\x00a\x00r\x00a\x00ç\x00ã\x00o\x00,\x00 \x00n\x00o\x00s\x00 \x00q\x00u\x00a\x00i\x00s\x00 \x00d\x00e\x00f\x00e\x00n\x00d\x00e\x00 \x00q\x00u\x00e\x00\n\x00\x1C d\x00a\x00d\x00a\x00 \x00a\x00 \x00i\x00m\x00p\x00e\x00r\x00i\x00o\x00s\x00a\x00 \x00n\x00e\x00c\x00e\x00s\x00s\x00i\x00d\x00a\x00d\x00e\x00 \x00d\x00e\x00 \x00e\x00v\x00i\x00t\x00a\x00r\x00 \x00m\x00a\x00l\x00 \x00m\x00a\x00i\x00o\x00r\x00 \x00e\x00m\x00 \x00v\x00i\x00r\x00t\x00u\x00d\x00e\x00 \x00d\x00a\x00 \x00d\x00e\x00c\x00l\x00a\x00r\x00a\x00ç\x00ã\x00o\x00 \x00d\x00e\x00\n\x00i\x00n\x00c\x00o\x00n\x00s\x00t\x00i\x00t\x00u\x00c\x00i\x00o\x00n\x00a\x00l\x00i\x00d\x00a\x00d\x00e\x00 \x00 \x00 \x00d\x00o\x00 \x00 \x00 \x00p\x00r\x00e\x00c\x00e\x00i\x00t\x00o\x00 \x00 \x00 \x00j\x00á\x00 \x00 \x00 \x00c\x00o\x00n\x00h\x00e\x00c\x00i\x00d\x00o\x00,\x00 \x00 \x00 \x00q\x00u\x00a\x00l\x00 \x00 \x00 \x00s\x00e\x00j\x00a\x00,\x00 \x00 \x00 \x00d\x00e\x00p\x00a\x00u\x00p\x00e\x00r\x00a\x00m\x00e\x00n\x00t\x00e\x00o\x00\n\x00i\x00r\x00r\x00e\x00v\x00e\x00r\x00s\x00í\x00v\x00e\x00l\x00 \x00d\x00o\x00s\x00 \x00s\x00e\x00r\x00v\x00i\x00d\x00o\x00r\x00e\x00s\x00 \x00q\x00u\x00e\x00 \x00a\x00t\x00u\x00a\x00m\x00 \x00n\x00a\x00 \x00á\x00r\x00e\x00a\x00 \x00j\x00u\x00r\x00í\x00d\x00i\x00c\x00a\x00 \x00d\x00a\x00s\x00 \x00a\x00u\x00t\x00a\x00r\x00q\x00u\x00i\x00a\x00s\x00 \x00g\x00o\x00i\x00a\x00n\x00a\x00s\x00,\x00 \x00e\x00m\x00\n\x00c\x00l\x00a\x00r\x00o\x00 \x00d\x00e\x00s\x00r\x00e\x00s\x00p\x00e\x00i\x00t\x00o\x00 \x00à\x00 \x00s\x00e\x00g\x00u\x00r\x00a\x00n\x00ç\x00a\x00 \x00j\x00u\x00r\x00í\x00d\x00i\x00c\x00a\x00 \x00e\x00 \x00à\x00 \x00p\x00r\x00ó\x00p\x00r\x00i\x00a\x00 \x00d\x00i\x00g\x00n\x00i\x00d\x00a\x00d\x00e\x00 \x00h\x00u\x00m\x00a\x00n\x00a\x00,\x00 \x00s\x00o\x00l\x00i\x00c\x00i\x00t\x00a\x00-\x00s\x00e\x00\n\x00q\x00u\x00e\x00 \x00a\x00 \x00i\x00n\x00c\x00o\x00n\x00s\x00t\x00i\x00t\x00u\x00c\x00i\x00o\x00n\x00a\x00l\x00i\x00d\x00a\x00d\x00e\x00 \x00d\x00e\x00c\x00l\x00a\x00r\x00a\x00d\x00a\x00 \x00t\x00e\x00n\x00h\x00a\x00 \x00e\x00f\x00e\x00i\x00t\x00o\x00s\x00 \x00a\x00 \x00c\x00o\x00n\x00t\x00a\x00r\x00 \x00a\x00 \x00p\x00a\x00r\x00t\x00i\x00r\x00 \x00d\x00o\x00 \x00t\x00r\x00â\x00n\x00s\x00i\x00t\x00o\x00\n\x00e\x00m\x00 \x00j\x00u\x00l\x00g\x00a\x00d\x00o\x00 \x00d\x00e\x00s\x00t\x00a\x00 \x00a\x00ç\x00ã\x00o\x00 \x00d\x00i\x00r\x00e\x00t\x00a\x00 \x00d\x00e\x00 \x00i\x00n\x00c\x00o\x00n\x00s\x00t\x00i\x00t\x00u\x00c\x00i\x00o\x00n\x00a\x00l\x00i\x00d\x00a\x00d\x00e\x00\x1D .\x00 \x00\n\x00P\x00r\x00e\x00t\x00e\x00n\x00d\x00e\x00\n\x00a\x00 \x00m\x00o\x00d\x00u\x00l\x00a\x00ç\x00ã\x00o\x00\n\x00d\x00o\x00s\x00 \x00e\x00f\x00e\x00i\x00t\x00o\x00s\x00 \x00a\x00 \x00p\x00a\x00r\x00t\x00i\x00r\x00 \x00d\x00o\x00 \x00t\x00r\x00â\x00n\x00s\x00i\x00t\x00o\x00 \x00e\x00m\x00 \x00j\x00u\x00l\x00g\x00a\x00d\x00o\x00 \x00d\x00e\x00s\x00t\x00a\x00 \x00a\x00ç\x00ã\x00o\x00.\x00 \x00 \x00\n\x00\n\x003\x00.\x00\n\x00E\x00m\x00 \x00a\x00m\x00b\x00i\x00e\x00n\x00t\x00e\x00 \x00v\x00i\x00r\x00t\x00u\x00a\x00l\x00 \x00d\x00e\x00 \x00j\x00u\x00l\x00g\x00a\x00m\x00e\x00n\x00t\x00o\x00,\x00 \x00o\x00 \x00e\x00m\x00i\x00n\x00e\x00n\x00t\x00e\x00 \x00M\x00i\x00n\x00i\x00s\x00t\x00r\x00o\x00\n\x00M\x00a\x00r\x00c\x00o\x00 \x00A\x00u\x00r\x00é\x00l\x00i\x00o\x00,\x00 \x00r\x00e\x00l\x00a\x00t\x00o\x00r\x00 \x00d\x00o\x00 \x00f\x00e\x00i\x00t\x00o\x00,\x00 \x00 \x00 \x00a\x00p\x00r\x00e\x00s\x00e\x00n\x00t\x00o\x00u\x00 \x00v\x00o\x00t\x00o\x00 \x00n\x00o\x00 \x00s\x00e\x00n\x00t\x00i\x00d\x00o\x00 \x00d\x00a\x00 \x00r\x00e\x00j\x00e\x00i\x00ç\x00ã\x00o\x00\n\x00d\x00o\x00s\x00 \x00e\x00m\x00b\x00a\x00r\x00g\x00o\x00s\x00.\x00\n\x00\n\x004\x00.\x00\n\x00D\x00i\x00v\x00i\x00r\x00j\x00o\x00 \x00r\x00e\x00s\x00p\x00e\x00i\x00t\x00o\x00s\x00a\x00m\x00e\x00n\x00t\x00e\x00 \x00d\x00e\x00 \x00S\x00u\x00a\x00 \x00E\x00x\x00c\x00e\x00l\x00ê\x00n\x00c\x00i\x00a\x00.\x00 \x00\n\x00<\x00/\x00p\x00>\x00\n\x00',
    autor:          ministro[4],
    tipo:           'VOGAL',
    acompanharam:   [
                      ministro[3],
                      ministro[9],
                      ministro[7],
                      ministro[1],
                      ministro[0],
                      ministro[10],
                      ministro[6],
                    ],
  },

  {
    id:             1,
    situacao:       'situacao',
    nome:           'nome',
    conteudo:       '<\x00h\x002\x00>\x00V\x00o\x00t\x00o\x00<\x00/\x00h\x002\x00>\x00\n\x00<\x00p\x00 \x00c\x00l\x00a\x00s\x00s\x00=\x00"\x00w\x00h\x00i\x00t\x00e\x00s\x00p\x00a\x00c\x00e\x00-\x00p\x00r\x00e\x00-\x00l\x00i\x00n\x00e\x00"\x00>\x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00\n\x001\x003\x00/\x000\x004\x00/\x002\x000\x002\x001\x00\n\x00P\x00L\x00E\x00N\x00Á\x00R\x00I\x00O\x00 \x00E\x00 \x00M\x00B\x00.\x00 \x00D\x00E\x00C\x00L\x00.\x00 \x00N\x00A\x00 \x00A\x00Ç\x00Ã\x00O\x00 \x00D\x00I\x00R\x00E\x00T\x00A\x00 \x00D\x00E\x00 \x00I\x00N\x00C\x00O\x00N\x00S\x00T\x00I\x00T\x00U\x00C\x00I\x00O\x00N\x00A\x00L\x00I\x00D\x00A\x00D\x00E\x00 \x006\x00.\x001\x008\x005\x00 \x00G\x00O\x00I\x00Á\x00S\x00 \x00V\x00O\x00T\x00O\x00 \x00O\x00 \x00S\x00E\x00N\x00H\x00O\x00R\x00 \x00M\x00I\x00N\x00I\x00S\x00T\x00R\x00O\x00 \x00M\x00A\x00R\x00C\x00O\x00 \x00A\x00U\x00R\x00É\x00L\x00I\x00O\x00 \x00(\x00R\x00E\x00L\x00A\x00T\x00O\x00R\x00)\x00:\x00\n\x00\n\x00E\x00M\x00B\x00A\x00R\x00G\x00O\x00S\x00 \x00D\x00E\x00C\x00L\x00A\x00R\x00A\x00T\x00Ó\x00R\x00I\x00O\x00S\x00 \x00\x13  \x00A\x00C\x00Ó\x00R\x00D\x00Ã\x00O\x00 \x00\x13  \x00V\x00Í\x00C\x00I\x00O\x00 \x00\x13 \n\x00I\x00N\x00E\x00X\x00I\x00S\x00T\x00Ê\x00N\x00C\x00I\x00A\x00.\x00 \x00I\x00n\x00e\x00x\x00i\x00s\x00t\x00i\x00n\x00d\x00o\x00,\x00 \x00n\x00o\x00 \x00a\x00c\x00ó\x00r\x00d\x00ã\x00o\x00 \x00f\x00o\x00r\x00m\x00a\x00l\x00i\x00z\x00a\x00d\x00o\x00,\x00 \x00q\x00u\x00a\x00l\x00q\x00u\x00e\x00r\x00\n\x00d\x00o\x00s\x00 \x00v\x00í\x00c\x00i\x00o\x00s\x00 \x00q\x00u\x00e\x00 \x00r\x00e\x00s\x00p\x00a\x00l\x00d\x00a\x00m\x00 \x00o\x00s\x00 \x00e\x00m\x00b\x00a\x00r\x00g\x00o\x00s\x00 \x00d\x00e\x00 \x00d\x00e\x00c\x00l\x00a\x00r\x00a\x00ç\x00ã\x00o\x00 \x00\x13  \x00o\x00m\x00i\x00s\x00s\x00ã\x00o\x00,\x00\n\x00c\x00o\x00n\x00t\x00r\x00a\x00d\x00i\x00ç\x00ã\x00o\x00,\x00 \x00 \x00 \x00o\x00b\x00s\x00c\x00u\x00r\x00i\x00d\x00a\x00d\x00e\x00 \x00 \x00 \x00e\x00 \x00 \x00 \x00e\x00r\x00r\x00o\x00 \x00 \x00 \x00m\x00a\x00t\x00e\x00r\x00i\x00a\x00l\x00 \x00 \x00 \x00\x13 ,\x00 \x00 \x00 \x00i\x00m\x00p\x00õ\x00e\x00-\x00s\x00e\x00 \x00 \x00 \x00o\x00\n\x00d\x00e\x00s\x00p\x00r\x00o\x00v\x00i\x00m\x00e\x00n\x00t\x00o\x00.\x00\n\x00A\x00Ç\x00Ã\x00O\x00 \x00 \x00 \x00D\x00I\x00R\x00E\x00T\x00A\x00 \x00 \x00 \x00D\x00E\x00 \x00 \x00 \x00I\x00N\x00C\x00O\x00N\x00S\x00T\x00I\x00T\x00U\x00C\x00I\x00O\x00N\x00A\x00L\x00I\x00D\x00A\x00D\x00E\x00 \x00 \x00 \x00\x13 \n\x00P\x00E\x00D\x00I\x00D\x00O\x00 \x00\x13  \x00P\x00R\x00O\x00C\x00E\x00D\x00Ê\x00N\x00C\x00I\x00A\x00 \x00\x13  \x00M\x00O\x00D\x00U\x00L\x00A\x00Ç\x00Ã\x00O\x00.\x00 \x00N\x00ã\x00o\x00 \x00c\x00a\x00b\x00e\x00,\x00 \x00u\x00m\x00a\x00\n\x00v\x00e\x00z\x00 \x00p\x00r\x00o\x00c\x00l\x00a\x00m\x00a\x00d\x00a\x00 \x00a\x00 \x00i\x00n\x00c\x00o\x00m\x00p\x00a\x00t\x00i\x00b\x00i\x00l\x00i\x00d\x00a\x00d\x00e\x00 \x00d\x00e\x00 \x00a\x00t\x00o\x00 \x00n\x00o\x00r\x00m\x00a\x00t\x00i\x00v\x00o\x00 \x00c\x00o\x00m\x00 \x00a\x00\n\x00C\x00o\x00n\x00s\x00t\x00i\x00t\x00u\x00i\x00ç\x00ã\x00o\x00 \x00 \x00 \x00F\x00e\x00d\x00e\x00r\x00a\x00l\x00,\x00 \x00 \x00 \x00p\x00r\x00o\x00j\x00e\x00t\x00a\x00r\x00 \x00 \x00 \x00o\x00 \x00 \x00 \x00s\x00u\x00r\x00g\x00i\x00m\x00e\x00n\x00t\x00o\x00 \x00 \x00 \x00d\x00o\x00s\x00 \x00 \x00 \x00e\x00f\x00e\x00i\x00t\x00o\x00s\x00 \x00 \x00 \x00d\x00a\x00\n\x00c\x00o\x00n\x00s\x00t\x00a\x00t\x00a\x00ç\x00ã\x00o\x00,\x00 \x00s\x00o\x00b\x00 \x00p\x00e\x00n\x00a\x00 \x00d\x00e\x00 \x00i\x00n\x00o\x00b\x00s\x00e\x00r\x00v\x00â\x00n\x00c\x00i\x00a\x00,\x00 \x00c\x00o\x00n\x00s\x00i\x00d\x00e\x00r\x00a\x00d\x00o\x00 \x00o\x00 \x00â\x00n\x00g\x00u\x00l\x00o\x00\n\x00d\x00a\x00 \x00 \x00 \x00h\x00i\x00g\x00i\x00d\x00e\x00z\x00,\x00 \x00 \x00 \x00d\x00a\x00 \x00 \x00 \x00L\x00e\x00i\x00 \x00 \x00 \x00M\x00a\x00i\x00o\x00r\x00,\x00 \x00 \x00 \x00c\x00o\x00m\x00o\x00 \x00 \x00 \x00s\x00e\x00 \x00 \x00 \x00a\x00t\x00é\x00 \x00 \x00 \x00e\x00n\x00t\x00ã\x00o\x00 \x00 \x00 \x00n\x00ã\x00o\x00 \x00 \x00 \x00t\x00i\x00v\x00e\x00s\x00s\x00e\x00\n\x00v\x00i\x00g\x00o\x00r\x00a\x00d\x00o\x00.\x00 \x00\n\x00\n\x00A\x00t\x00e\x00n\x00d\x00e\x00u\x00-\x00s\x00e\x00 \x00a\x00o\x00s\x00 \x00p\x00r\x00e\x00s\x00s\x00u\x00p\x00o\x00s\x00t\x00o\x00s\x00 \x00d\x00e\x00 \x00r\x00e\x00c\x00o\x00r\x00r\x00i\x00b\x00i\x00l\x00i\x00d\x00a\x00d\x00e\x00.\x00 \x00A\x00 \x00p\x00e\x00ç\x00a\x00,\x00 \x00s\x00u\x00b\x00s\x00c\x00r\x00i\x00t\x00a\x00\n\x00p\x00o\x00r\x00 \x00P\x00r\x00o\x00c\x00u\x00r\x00a\x00d\x00o\x00r\x00,\x00 \x00f\x00o\x00i\x00 \x00p\x00r\x00o\x00t\x00o\x00c\x00o\x00l\x00a\x00d\x00a\x00 \x00n\x00o\x00 \x00p\x00r\x00a\x00z\x00o\x00 \x00a\x00s\x00s\x00i\x00n\x00a\x00d\x00o\x00 \x00e\x00m\x00 \x00l\x00e\x00i\x00.\x00 \x00\n\x00N\x00ã\x00o\x00 \x00c\x00a\x00b\x00e\x00,\x00 \x00u\x00m\x00a\x00 \x00v\x00e\x00z\x00 \x00p\x00r\x00o\x00c\x00l\x00a\x00m\x00a\x00d\x00o\x00 \x00o\x00 \x00d\x00e\x00s\x00c\x00o\x00m\x00p\x00a\x00s\x00s\x00o\x00 \x00c\x00o\x00m\x00 \x00a\x00 \x00C\x00o\x00n\x00s\x00t\x00i\x00t\x00u\x00i\x00ç\x00ã\x00o\x00\n\x00F\x00e\x00d\x00e\x00r\x00a\x00l\x00,\x00 \x00p\x00r\x00o\x00j\x00e\x00t\x00a\x00r\x00 \x00o\x00 \x00s\x00u\x00r\x00g\x00i\x00m\x00e\x00n\x00t\x00o\x00 \x00d\x00o\x00s\x00 \x00e\x00f\x00e\x00i\x00t\x00o\x00s\x00 \x00d\x00a\x00 \x00c\x00o\x00n\x00s\x00t\x00a\x00t\x00a\x00ç\x00ã\x00o\x00,\x00 \x00s\x00o\x00b\x00 \x00p\x00e\x00n\x00a\x00 \x00d\x00e\x00\n\x00i\x00n\x00o\x00b\x00s\x00e\x00r\x00v\x00â\x00n\x00c\x00i\x00a\x00,\x00 \x00p\x00e\x00l\x00o\x00 \x00â\x00n\x00g\x00u\x00l\x00o\x00 \x00d\x00a\x00 \x00h\x00i\x00g\x00i\x00d\x00e\x00z\x00,\x00 \x00d\x00a\x00 \x00L\x00e\x00i\x00 \x00M\x00a\x00i\x00o\x00r\x00,\x00 \x00c\x00o\x00m\x00o\x00 \x00s\x00e\x00 \x00a\x00t\x00é\x00 \x00e\x00n\x00t\x00ã\x00o\x00\n\x00n\x00ã\x00o\x00 \x00t\x00i\x00v\x00e\x00s\x00s\x00e\x00 \x00v\x00i\x00g\x00o\x00r\x00a\x00d\x00o\x00.\x00\n\x00N\x00o\x00r\x00m\x00a\x00 \x00i\x00n\x00c\x00o\x00n\x00s\x00t\x00i\x00t\x00u\x00c\x00i\x00o\x00n\x00a\x00l\x00 \x00é\x00,\x00 \x00n\x00a\x00 \x00d\x00i\x00c\x00ç\x00ã\x00o\x00 \x00d\x00e\x00 \x00R\x00u\x00i\x00 \x00B\x00a\x00r\x00b\x00o\x00s\x00a\x00,\x00 \x00n\x00a\x00t\x00i\x00m\x00o\x00r\x00t\x00a\x00,\x00 \x00s\x00e\x00m\x00\n\x00e\x00f\x00i\x00c\x00á\x00c\x00i\x00a\x00 \x00a\x00n\x00t\x00e\x00 \x00a\x00 \x00r\x00i\x00g\x00i\x00d\x00e\x00z\x00 \x00d\x00o\x00 \x00d\x00o\x00c\x00u\x00m\x00e\x00n\x00t\x00o\x00 \x00b\x00á\x00s\x00i\x00c\x00o\x00 \x00d\x00a\x00 \x00R\x00e\x00p\x00ú\x00b\x00l\x00i\x00c\x00a\x00.\x00 \x00F\x00o\x00r\x00m\x00a\x00l\x00i\x00z\x00a\x00d\x00a\x00 \x00a\x00\n\x00d\x00e\x00c\x00i\x00s\x00ã\x00o\x00,\x00 \x00é\x00 \x00i\x00n\x00a\x00d\x00e\x00q\x00u\x00a\x00d\x00a\x00 \x00a\x00 \x00e\x00l\x00u\x00c\x00i\x00d\x00a\x00ç\x00ã\x00o\x00 \x00d\x00e\x00 \x00c\x00o\x00n\x00f\x00l\x00i\x00t\x00o\x00 \x00d\x00e\x00 \x00i\x00n\x00t\x00e\x00r\x00e\x00s\x00s\x00e\x00s\x00 \x00d\x00e\x00 \x00c\x00a\x00r\x00á\x00t\x00e\x00r\x00\n\x00s\x00u\x00b\x00j\x00e\x00t\x00i\x00v\x00o\x00.\x00 \x00N\x00ã\x00o\x00 \x00s\x00e\x00 \x00e\x00s\x00t\x00á\x00 \x00a\x00 \x00j\x00u\x00l\x00g\x00a\x00r\x00 \x00s\x00i\x00t\x00u\x00a\x00ç\x00ã\x00o\x00 \x00c\x00o\x00n\x00c\x00r\x00e\x00t\x00a\x00,\x00 \x00c\x00o\x00n\x00c\x00e\x00b\x00i\x00d\x00a\x00 \x00a\x00 \x00p\x00a\x00r\x00t\x00i\x00r\x00 \x00d\x00o\x00 \x00q\x00u\x00e\x00\n\x00s\x00e\x00 \x00r\x00e\x00v\x00e\x00l\x00a\x00 \x00i\x00n\x00c\x00o\x00n\x00s\x00t\x00i\x00t\x00u\x00c\x00i\x00o\x00n\x00a\x00l\x00i\x00d\x00a\x00d\x00e\x00 \x00ú\x00t\x00i\x00l\x00,\x00 \x00l\x00e\x00v\x00a\x00n\x00d\x00o\x00 \x00e\x00m\x00 \x00c\x00o\x00n\x00t\x00a\x00 \x00a\x00 \x00m\x00o\x00r\x00o\x00s\x00i\x00d\x00a\x00d\x00e\x00 \x00d\x00a\x00\n\x00m\x00á\x00q\x00u\x00i\x00n\x00a\x00 \x00j\x00u\x00d\x00i\x00c\x00i\x00á\x00r\x00i\x00a\x00.\x00 \x00\n\x00<\x00/\x00p\x00>\x00\n\x00',
    autor:          ministro[2],
    tipo:           'RELATOR',
    acompanharam:   [ ministro[8] ],
  },

  {
    id:             1,
    situacao:       'situacao',
    nome:           'nome',
    conteudo:       '<\x00h\x002\x00>\x00V\x00o\x00t\x00o\x00<\x00/\x00h\x002\x00>\x00\n\x00<\x00p\x00 \x00c\x00l\x00a\x00s\x00s\x00=\x00"\x00w\x00h\x00i\x00t\x00e\x00s\x00p\x00a\x00c\x00e\x00-\x00p\x00r\x00e\x00-\x00l\x00i\x00n\x00e\x00"\x00>\x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00 \x00\n\x00A\x00D\x00I\x00 \x006\x001\x008\x005\x00 \x00E\x00D\x00 \x00/\x00 \x00G\x00O\x00 \x00\n\x00C\x00o\x00n\x00s\x00t\x00i\x00t\x00u\x00i\x00ç\x00ã\x00o\x00 \x00 \x00 \x00F\x00e\x00d\x00e\x00r\x00a\x00l\x00,\x00 \x00 \x00 \x00p\x00r\x00o\x00j\x00e\x00t\x00a\x00r\x00 \x00 \x00 \x00o\x00 \x00 \x00 \x00s\x00u\x00r\x00g\x00i\x00m\x00e\x00n\x00t\x00o\x00 \x00 \x00 \x00d\x00o\x00s\x00 \x00 \x00 \x00e\x00f\x00e\x00i\x00t\x00o\x00s\x00 \x00 \x00 \x00d\x00a\x00\n\x00c\x00o\x00n\x00s\x00t\x00a\x00t\x00a\x00ç\x00ã\x00o\x00,\x00 \x00s\x00o\x00b\x00 \x00p\x00e\x00n\x00a\x00 \x00d\x00e\x00 \x00i\x00n\x00o\x00b\x00s\x00e\x00r\x00v\x00â\x00n\x00c\x00i\x00a\x00,\x00 \x00c\x00o\x00n\x00s\x00i\x00d\x00e\x00r\x00a\x00d\x00o\x00 \x00o\x00 \x00â\x00n\x00g\x00u\x00l\x00o\x00\n\x00d\x00a\x00 \x00 \x00 \x00h\x00i\x00g\x00i\x00d\x00e\x00z\x00,\x00 \x00 \x00 \x00d\x00a\x00 \x00 \x00 \x00L\x00e\x00i\x00 \x00 \x00 \x00M\x00a\x00i\x00o\x00r\x00,\x00 \x00 \x00 \x00c\x00o\x00m\x00o\x00 \x00 \x00 \x00s\x00e\x00 \x00 \x00 \x00a\x00t\x00é\x00 \x00 \x00 \x00e\x00n\x00t\x00ã\x00o\x00 \x00 \x00 \x00n\x00ã\x00o\x00 \x00 \x00 \x00t\x00i\x00v\x00e\x00s\x00s\x00e\x00\n\x00v\x00i\x00g\x00o\x00r\x00a\x00d\x00o\x00.\x00 \x00É\x00 \x00o\x00 \x00r\x00e\x00l\x00a\x00t\x00ó\x00r\x00i\x00o\x00.\x00\n\x00\n\x00C\x00o\x00m\x00 \x00a\x00s\x00 \x00d\x00e\x00v\x00i\x00d\x00a\x00s\x00 \x00v\x00ê\x00n\x00i\x00a\x00s\x00,\x00 \x00D\x00I\x00V\x00I\x00R\x00J\x00O\x00 \x00d\x00o\x00 \x00v\x00o\x00t\x00o\x00 \x00p\x00r\x00o\x00f\x00e\x00r\x00i\x00d\x00o\x00 \x00p\x00e\x00l\x00o\x00 \x00M\x00i\x00n\x00i\x00s\x00t\x00r\x00o\x00\n\x00R\x00e\x00l\x00a\x00t\x00o\x00r\x00.\x00\n\x00\n\x00N\x00o\x00s\x00 \x00 \x00 \x00t\x00e\x00r\x00m\x00o\x00s\x00 \x00 \x00 \x00d\x00o\x00 \x00 \x00 \x00a\x00r\x00t\x00.\x00 \x00 \x00 \x002\x007\x00 \x00 \x00 \x00d\x00a\x00 \x00 \x00 \x00L\x00e\x00i\x00 \x00 \x00 \x009\x00.\x008\x006\x008\x00/\x009\x009\x00,\x00 \x00 \x00 \x00c\x00o\x00m\x00p\x00e\x00t\x00e\x00 \x00 \x00 \x00a\x00o\x00 \x00 \x00 \x00S\x00U\x00P\x00R\x00E\x00M\x00O\x00\n\x00T\x00R\x00I\x00B\x00U\x00N\x00A\x00L\x00 \x00F\x00E\x00D\x00E\x00R\x00A\x00L\x00,\x00 \x00a\x00o\x00 \x00d\x00e\x00c\x00l\x00a\x00r\x00a\x00r\x00 \x00a\x00 \x00i\x00n\x00c\x00o\x00n\x00s\x00t\x00i\x00t\x00u\x00c\x00i\x00o\x00n\x00a\x00l\x00i\x00d\x00a\x00d\x00e\x00 \x00d\x00e\x00 \x00l\x00e\x00i\x00 \x00o\x00u\x00 \x00a\x00t\x00o\x00\n\x00n\x00o\x00r\x00m\x00a\x00t\x00i\x00v\x00o\x00,\x00 \x00 \x00 \x00d\x00e\x00c\x00i\x00d\x00i\x00r\x00 \x00 \x00 \x00a\x00 \x00 \x00 \x00r\x00e\x00s\x00p\x00e\x00i\x00t\x00o\x00 \x00 \x00 \x00d\x00a\x00 \x00 \x00 \x00m\x00o\x00d\x00u\x00l\x00a\x00ç\x00ã\x00o\x00 \x00 \x00 \x00d\x00o\x00s\x00 \x00 \x00 \x00e\x00f\x00e\x00i\x00t\x00o\x00s\x00 \x00 \x00 \x00d\x00a\x00 \x00 \x00 \x00d\x00e\x00c\x00i\x00s\x00ã\x00o\x00,\x00\n\x00f\x00u\x00g\x00i\x00n\x00d\x00o\x00 \x00d\x00a\x00 \x00r\x00e\x00g\x00r\x00a\x00 \x00d\x00a\x00 \x00t\x00e\x00o\x00r\x00i\x00a\x00 \x00d\x00a\x00 \x00n\x00u\x00l\x00i\x00d\x00a\x00d\x00e\x00 \x00d\x00o\x00s\x00 \x00a\x00t\x00o\x00s\x00 \x00i\x00n\x00c\x00o\x00n\x00s\x00t\x00i\x00t\x00u\x00c\x00i\x00o\x00n\x00a\x00i\x00s\x00,\x00 \x00q\x00u\x00e\x00\n\x00r\x00e\x00z\x00a\x00 \x00p\x00e\x00l\x00a\x00 \x00a\x00p\x00l\x00i\x00c\x00a\x00ç\x00ã\x00o\x00 \x00d\x00e\x00 \x00e\x00f\x00e\x00i\x00t\x00o\x00s\x00 \x00 \x00\n\x00e\x00x\x00 \x00t\x00u\x00n\x00c\x00 \x00a\x00o\x00 \x00d\x00e\x00c\x00i\x00s\x00u\x00m\x00.\x00 \x00\n\x00\n\x00A\x00s\x00s\x00i\x00m\x00,\x00 \x00o\x00 \x00d\x00i\x00s\x00p\x00o\x00s\x00i\x00t\x00i\x00v\x00o\x00 \x00l\x00e\x00g\x00a\x00l\x00 \x00 \x00 \x00p\x00e\x00r\x00m\x00i\x00t\x00e\x00 \x00 \x00 \x00à\x00 \x00 \x00 \x00C\x00O\x00R\x00T\x00E\x00 \x00 \x00 \x00a\x00d\x00o\x00t\x00a\x00r\x00 \x00 \x00 \x00e\x00f\x00e\x00i\x00t\x00o\x00s\x00 \x00 \x00 \x00p\x00r\x00o\x00s\x00p\x00e\x00c\x00t\x00i\x00v\x00o\x00s\x00 \x00 \x00 \x00à\x00 \x00 \x00 \x00\n\x00d\x00e\x00c\x00l\x00a\x00r\x00a\x00ç\x00ã\x00o\x00 \x00 \x00 \x00d\x00e\x00\n\x00i\x00n\x00c\x00o\x00n\x00s\x00t\x00i\x00t\x00u\x00c\x00i\x00o\x00n\x00a\x00l\x00i\x00d\x00a\x00d\x00e\x00,\x00 \x00 \x00 \x00p\x00a\x00r\x00a\x00 \x00 \x00 \x00g\x00a\x00r\x00a\x00n\x00t\x00i\x00a\x00 \x00 \x00 \x00d\x00a\x00 \x00 \x00 \x00s\x00e\x00g\x00u\x00r\x00a\x00n\x00ç\x00a\x00 \x00 \x00 \x00j\x00u\x00r\x00í\x00d\x00i\x00c\x00a\x00 \x00 \x00 \x00o\x00u\x00 \x00 \x00 \x00d\x00e\x00\n\x00e\x00x\x00c\x00e\x00p\x00c\x00i\x00o\x00n\x00a\x00l\x00 \x00i\x00n\x00t\x00e\x00r\x00e\x00s\x00s\x00e\x00 \x00s\x00o\x00c\x00i\x00a\x00l\x00.\x00\n\x00Q\x00u\x00a\x00n\x00d\x00o\x00 \x00 \x00 \x00a\x00s\x00s\x00i\x00m\x00 \x00 \x00 \x00n\x00ã\x00o\x00 \x00 \x00 \x00o\x00 \x00 \x00 \x00f\x00a\x00z\x00,\x00 \x00 \x00 \x00a\x00 \x00 \x00 \x00j\x00u\x00r\x00i\x00s\x00p\x00r\x00u\x00d\x00ê\x00n\x00c\x00i\x00a\x00 \x00 \x00 \x00d\x00e\x00s\x00t\x00a\x00 \x00 \x00 \x00C\x00O\x00R\x00T\x00E\x00 \x00 \x00 \x00a\x00i\x00n\x00d\x00a\x00\n\x00r\x00e\x00c\x00o\x00n\x00h\x00e\x00c\x00e\x00 \x00o\x00 \x00c\x00a\x00b\x00i\x00m\x00e\x00n\x00t\x00o\x00 \x00d\x00e\x00 \x00e\x00m\x00b\x00a\x00r\x00g\x00o\x00s\x00 \x00d\x00e\x00c\x00l\x00a\x00r\x00a\x00t\x00ó\x00r\x00i\x00o\x00s\x00 \x00p\x00a\x00r\x00a\x00 \x00a\x00 \x00f\x00i\x00n\x00a\x00l\x00i\x00d\x00a\x00d\x00e\x00 \x00d\x00e\x00\n\x00a\x00p\x00u\x00r\x00a\x00r\x00 \x00a\x00 \x00n\x00e\x00c\x00e\x00s\x00s\x00i\x00d\x00a\x00d\x00e\x00 \x00d\x00e\x00 \x00m\x00o\x00d\x00u\x00l\x00a\x00r\x00 \x00a\x00 \x00e\x00f\x00i\x00c\x00á\x00c\x00i\x00a\x00 \x00d\x00a\x00s\x00 \x00d\x00e\x00c\x00i\x00s\x00õ\x00e\x00s\x00 \x00p\x00r\x00o\x00f\x00e\x00r\x00i\x00d\x00a\x00s\x00 \x00e\x00m\x00\n\x00s\x00e\x00d\x00e\x00 \x00d\x00e\x00 \x00c\x00o\x00n\x00t\x00r\x00o\x00l\x00e\x00 \x00c\x00o\x00n\x00c\x00e\x00n\x00t\x00r\x00a\x00d\x00o\x00 \x00d\x00e\x00 \x00c\x00o\x00n\x00s\x00t\x00i\x00t\x00u\x00c\x00i\x00o\x00n\x00a\x00l\x00i\x00d\x00a\x00d\x00e\x00 \x00(\x00A\x00D\x00I\x00 \x003\x00.\x006\x000\x001\x00-\x00E\x00D\x00,\x00 \x00R\x00e\x00l\x00.\x00\n\x00M\x00i\x00n\x00.\x00 \x00D\x00I\x00A\x00S\x00 \x00T\x00O\x00F\x00F\x00O\x00L\x00I\x00,\x00 \x00D\x00J\x00e\x00 \x00d\x00e\x00 \x001\x005\x00/\x001\x002\x00/\x002\x000\x001\x000\x00)\x00.\x00 \x00P\x00a\x00r\x00a\x00 \x00v\x00i\x00a\x00b\x00i\x00l\x00i\x00z\x00a\x00r\x00 \x00e\x00s\x00s\x00e\x00 \x00t\x00i\x00p\x00o\x00 \x00d\x00e\x00\n\x00a\x00v\x00a\x00l\x00i\x00a\x00ç\x00ã\x00o\x00,\x00 \x00c\x00o\x00n\x00t\x00u\x00d\x00o\x00,\x00 \x00é\x00 \x00n\x00e\x00c\x00e\x00s\x00s\x00á\x00r\x00i\x00o\x00 \x00q\x00u\x00e\x00 \x00o\x00 \x00e\x00m\x00b\x00a\x00r\x00g\x00a\x00n\x00t\x00e\x00 \x00s\x00e\x00 \x00d\x00e\x00s\x00i\x00n\x00c\x00u\x00m\x00b\x00a\x00 \x00d\x00o\x00\n\x00ô\x00n\x00u\x00s\x00 \x00d\x00e\x00 \x00c\x00o\x00m\x00p\x00r\x00o\x00v\x00a\x00r\x00,\x00 \x00c\x00o\x00n\x00c\x00r\x00e\x00t\x00a\x00m\x00e\x00n\x00t\x00e\x00,\x00 \x00a\x00 \x00p\x00r\x00e\x00s\x00e\x00n\x00ç\x00a\x00 \x00d\x00e\x00 \x00e\x00l\x00e\x00m\x00e\x00n\x00t\x00o\x00s\x00 \x00e\x00x\x00c\x00e\x00p\x00c\x00i\x00o\x00n\x00a\x00i\x00s\x00\n\x00q\x00u\x00e\x00 \x00 \x00 \x00j\x00u\x00s\x00t\x00i\x00f\x00i\x00q\x00u\x00e\x00m\x00 \x00 \x00 \x00a\x00 \x00 \x00 \x00r\x00e\x00t\x00r\x00a\x00ç\x00ã\x00o\x00,\x00 \x00 \x00 \x00n\x00o\x00 \x00 \x00 \x00t\x00e\x00m\x00p\x00o\x00,\x00 \x00 \x00 \x00d\x00o\x00s\x00 \x00 \x00 \x00e\x00f\x00e\x00i\x00t\x00o\x00s\x00 \x00 \x00 \x00d\x00a\x00 \x00 \x00 \x00d\x00e\x00c\x00i\x00s\x00ã\x00o\x00 \x00 \x00 \x00d\x00e\x00\n\x00i\x00n\x00c\x00o\x00n\x00s\x00t\x00i\x00t\x00u\x00c\x00i\x00o\x00n\x00a\x00l\x00i\x00d\x00a\x00d\x00e\x00,\x00 \x00q\x00u\x00e\x00 \x00d\x00e\x00 \x00r\x00e\x00g\x00r\x00a\x00 \x00o\x00p\x00e\x00r\x00a\x00m\x00 \x00 \x00\n\x00e\x00x\x00 \x00t\x00u\x00n\x00c\x00\n\x00 \x00(\x00A\x00D\x00I\x00 \x003\x00.\x007\x009\x004\x00-\x00E\x00D\x00,\x00 \x00R\x00e\x00l\x00.\x00\n\x00M\x00i\x00n\x00.\x00 \x00R\x00O\x00B\x00E\x00R\x00T\x00O\x00 \x00B\x00A\x00R\x00R\x00O\x00S\x00O\x00,\x00 \x00D\x00J\x00e\x00 \x00d\x00e\x00 \x002\x005\x00/\x002\x00/\x002\x000\x001\x005\x00;\x00 \x00A\x00D\x00I\x00 \x004\x00.\x008\x007\x006\x00-\x00E\x00D\x00,\x00 \x00R\x00e\x00l\x00.\x00 \x00M\x00i\x00n\x00.\x00\n\x00D\x00I\x00A\x00S\x00 \x00T\x00O\x00F\x00F\x00O\x00L\x00I\x00,\x00 \x00D\x00J\x00e\x00 \x00d\x00e\x00 \x001\x008\x00/\x008\x00/\x002\x000\x001\x005\x00)\x00.\x00\n\x00<\x00/\x00p\x00>\x00\n\x00',
    autor:          ministro[5],
    tipo:           'PRESIDENTE',
    acompanharam:   [],
  },
];

export const tipos: string[] = [
  'Preliminar',
  'Mérito',
  'Modulação de efeitos',
  'Questão de ordem',
  'Tese',
];

export const vistas: Vista[] = getStorage('vistas', []);

export const destaques: Destaque[] = getStorage('destaques', []);
