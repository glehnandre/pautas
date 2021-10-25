import { Envolvido } from "app/modules/acervo/model/interfaces/envolvido.interface";
import { Publicacao } from "app/modules/acervo/model/interfaces/publicacao.interface";

export const envolvidos: Envolvido[] = [
    {
        nome: "Verenice Pereira da Silva",
        polo: "ATIVO",
        categoria: "RECORRENTE(S)",
        identificacoes: [],
    },
    {
        nome: "Claudio Paulino dos Santos",
        polo: "ATIVO",
        categoria: "ADVOGADO(A/S)",
        identificacoes: ["OAB 422269/SP"],
    },
    {
        nome: "Estado de Alagoas",
        polo: "PASSIVO",
        categoria: "RECORRIDO(A/S)",
        identificacoes: [],
    },
    {
        nome: "Procurador-geral do Estado de Alagoas ",
        polo: "PASSIVO",
        categoria: "PROCURADOR(ES)",
        identificacoes: ["OAB's (422269/SP, 9092/AL, 422269/SP, 9092/AL, 422269/SP, 9092/AL, 422269/SP, 9092/AL)"],
    },
]

export const publicacao: Publicacao = {
    id: 1,
    processo: "ARE 1071279",
    processoId: 1,
    tipo: "Mérito",
    relator: "Luiz Fux",
    divulgacao: "2016-08-29T09:12:33.001Z",
    publicacao: "2016-08-29T09:12:33.001Z",
    texto: "",
    envolvidos: [envolvidos[0], envolvidos[1], envolvidos[2], envolvidos[3]],
    codigo: "decisoes-minutas:77590",
    observacao: "",
}

