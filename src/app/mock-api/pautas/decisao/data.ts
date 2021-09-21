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
      lista: {
        descricao: "Semelhante a ADI 100",
        id: 123445,
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
      classe: "ADI",
      numero: 100,
      nome: "Embargo de declaração",
      situacao: {
        id: 1,
        nome: "Apto a Julgar"
      },
      tipo: "Merito",
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
      colegiado: {
        nome: "Primeira turma",
        presidente: {
          id: 12314441,
          nome: "Luiz Fux",
          imagem: "string",
          abreviacao: "MLF",
          cadeira: "string",
        },
        composicao: [
          {
            ministro: {
              id: 12314441,
              nome: "Luiz Fux",
              imagem: "string",
              abreviacao: "MLF",
              cadeira: "string"
            },
            pode_votar: true,
            votou: false
          }
        ],
        data: "2016-08-29T09:12:33.001Z"
      },
      
      tipo: "ORDINARIA",
      categoria: "REPERCUSSAO_GERAL",
      modalidade: "VIRTUAL",
      data_inicio: "2016-08-29T09:12:33.001Z",
      data_fim: "2016-08-29T09:12:33.001Z",
      
      secretario: {
        id: 19,
        nome: "Carmen",
      },
      situacao: "PUBLICADA",
    }
  }
];