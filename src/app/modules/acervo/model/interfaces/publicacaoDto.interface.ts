import { Envolvido } from "./envolvido.interface";
import { SessaoJulgamento } from "./sessao-julgamento.interface";

export interface PublicacaoDto{
    id: number;
    processo: string;
    processoId: number;
    sessao?: SessaoJulgamento;
    tipo: string;
    relator: string;
    divulgacao: string;
    publicacao: string
    texto: string;
    envolvidos: Envolvido[];
    codigo: string;
    observacao: string;
}