import { Processo } from "./processo.interface";
import { Envolvido } from "./envolvido.interface";

export interface Publicacao{
    id: number;
    processo: Processo;
    tipo: string;
    assinatura: string;
    texto: string;
    textoSemFormatacao: string;
    hashValidacao: string;
    peca: number;
    codigo: string;
    observacao: string;
    envolvidos: Envolvido[];
}