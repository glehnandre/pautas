import { Ministro } from "./ministro.interface";

export interface SessaoJulgamento {
    numero: number;
    ano: number;
    colegiado: string;
    tipo: string;
    categoria: string;
    modalidade: string;
    data_inicio: string;
    data_fim: string;
    presidencia: Ministro;
    secretario?: {
        id: number;
        nome: string;
    };
    situacao: 'PUBLICADA' | 'APROVADA' | 'FECHADA' | 'ABERTA' | 'FINALIZADA' | 'REJEITADA';
}