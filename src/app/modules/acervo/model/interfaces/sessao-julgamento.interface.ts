import { Ata } from "./ata.interface";
import { Processo } from "./processo.interface";

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
    ata: Ata;
    processos: Array<Processo>;
}
