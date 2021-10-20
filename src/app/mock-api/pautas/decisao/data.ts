export const decisoes: any[] = [
  {
    decisoes: [
      {
        id: 1,
        nome: "Voto divergente Ministra Cármen Lúcia",
        tipo: "voto",
        url: "/digital/documento/12333",
      }
    ],
    processo: {
      id: 123455,
      ementa: "Sessão de julgamento extraordinária para tratar da divisão de terras.",
      lista: [
        {
          descricao: "Semelhante a ADI 100",
          id: 1,
          gestor: {
            numero: 19,
            ocupante: {
              id: 12314441,
              nome: "Luiz Fux",
              imagem: "string",
              abreviacao: "MLF",
              cadeira: "string",
            },
            criação: "2016-08-29T09:12:33.001Z"
          },
          publica: false
        },
        {
          descricao: "Semelhante a ADI 200",
          id: 2,
          gestor: {
            numero: 19,
            ocupante: {
              id: 12314441,
              nome: "Luiz Fux",
              imagem: "string",
              abreviacao: "MLF",
              cadeira: "string",
            },
            criação: "2016-08-29T09:12:33.001Z"
          },
          publica: false
        }
      ],
      classe: "ADI",
      numero: 100,
      nome: "Embargo de declaração",
      situacao: {
        id: 1,
        nome: "Apto a Julgar"
      },
      tipo: "Merito",
      abreviacao: '',
      relator: {
        numero: 19,
        ocupante: {
            id: 5,
            nome: 'Roberto Barroso',
            abreviacao: 'RB',
            cadeira: {
              criacao: '2021-08-02T03:00:00.000Z',
              numero: 100,
            },
            imagem: 'data:image/png;base64,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',
        },
        criação: "2016-08-29T09:12:33.001Z"
      },
      redator: {
      },
      capitulos: [
        {
          id: 123455,
          descricao: "",
          ordem: 1,
          tipo: "Mérito"
        }
      ]
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
  }
];
