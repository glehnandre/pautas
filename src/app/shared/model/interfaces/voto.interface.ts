import { Ministro } from "./ministro.interface";

export interface VotoDoMinistro {
    ministro: Ministro;
    voto: {
        incluir_voto: boolean;
        ja_votou: boolean;
        pode_votar: boolean;
    }
}

export interface Voto {
    id: number;
    situacao: string;
    nome: string;
    conteudo: string;
    autor: Ministro;
    tipo: 'VOGAL' | 'RELATOR' | 'VISTA' | 'PRESIDENTE';
    acompanharam:   Ministro[];
}