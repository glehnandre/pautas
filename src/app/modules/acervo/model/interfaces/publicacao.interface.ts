import { Envolvido } from "./envolvido.interface";

export interface Publicacao{
    id: number;
    processo: string;
    processoId: number;
    tipo: string;
    relator: string;
    divulgacao: string;
    publicacao: string
    texto: string;
    envolvidos: Envolvido[];
    codigo: string;
    observacao: string;
}