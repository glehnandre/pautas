import { Ministro } from "./ministro.interface";

export interface SessaoJulgamento {
    id: number;
    numero: number;
    ano: number;
    colegiado: string;
    tipo: string;
    categoria: string;
    modalidade: string;
    data_inicio: string;
    data_fim: string;
    situacao: 'PUBLICADA' | 'APROVADA' | 'FECHADA' | 'ABERTA' | 'FINALIZADA' | 'REJEITADA';
    secretario?: { id: number; nome: string; };
    ministros_presentes?: Array<Ministro>;
    ministros_ausentes?: Array<Ministro>;
    presidencia?: Ministro;
}
