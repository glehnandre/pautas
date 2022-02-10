import { Envolvido } from "./envolvido.interface";
import { SessaoDeJulgamento } from "./sessao-julgamento.interface";

export interface PublicacaoDto{
    id: number;
    processo: string;
    processoId: number;
    sessao?: SessaoDeJulgamento;
    tipo: string;
    relator: string;
    divulgacao: string;
    publicacao: string
    texto: string;
    envolvidos: Envolvido[];
    codigo: string;
    observacao: string;
}