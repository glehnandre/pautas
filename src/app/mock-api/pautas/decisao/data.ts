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
          id: 12314441,
          nome: "Luiz Fux",
          imagem: "string",
          abreviacao: "MLF",
          cadeira: "string"
        },
        criação: "2016-08-29T09:12:33.001Z"
      },
      redator: {
        numero: 19,
        ocupante: {
          id: 12314441,
          nome: "Luiz Fux",
          imagem: "string",
          abreviacao: "MLF",
          cadeira: "string"
        },
        criação: "2016-08-29T09:12:33.001Z"
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