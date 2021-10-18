import { Envolvido } from "app/modules/acervo/model/interfaces/envolvido.interface";
import { Processo } from "app/modules/acervo/model/interfaces/processo.interface";
import { Publicacao } from "app/modules/acervo/model/interfaces/publicacao.interface";

export const envolvidos: Envolvido[] = [
    {
        id: 1,
        pessoaId: 1,
        nome: "VERENICE PEREIRA DA SILVA",
        identificacoes: ['RECORRENTE(S)'],
        parteId: 0,
        Polo: {
            descricao: '',
            sigla: '',
        },
        categoria: '',
    },
    {
        id: 2,
        pessoaId: 2,
        nome: "Claudio Paulino dos Santos",
        identificacoes: ['ADVOGADO(A/S)'],
        parteId: 0,
        Polo: {
            descricao: '',
            sigla: '',
        },
        categoria: '',
    },
    {
        id: 3,
        pessoaId: 3,
        nome: "Estado de Alagoas",
        identificacoes: ['RECORRIDO(A/S)'],
        parteId: 1,
        Polo: {
            descricao: '',
            sigla: '',
        },
        categoria: '',
    },
    {
        id: 4,
        pessoaId: 4,
        nome: "Procurador-geral do Estado de Alagoas ",
        identificacoes: ['PROCURADOR(ES)'],
        parteId: 1,
        Polo: {
            descricao: '',
            sigla: '',
        },
        categoria: '',
    },
    
]

export const publicacao: Publicacao = {
    id: 1,
    processo: {} as Processo,
    tipo: "Mérito",
    assinatura: '',
    texto: '',
    textoSemFormatacao: '',
    hashValidacao: '',
    peca: 0,
    codigo: '',
    observacao: '', 
    envolvidos: [envolvidos[0], envolvidos[1], envolvidos[2], envolvidos[3]],
}

