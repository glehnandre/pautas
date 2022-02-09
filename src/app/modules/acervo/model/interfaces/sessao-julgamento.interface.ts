import { Ata } from "./ata.interface";
import { Processo } from "./processo.interface";

export interface SessaoDeJulgamento {
    id: number;
    numero: number;
    ano: number;
    colegiado: string;
    tipo: string; //ORDINARIA, EXTRAORDIONARIA
    categoria: string; // JUDICIAL ADMINISTRATIVA
    modalidade: string; //VIRTUAL, PRESENCIAL
    data_inicio: string;
    data_fim: string;
    situacao: 'PUBLICADA' | 'APROVADA' | 'FECHADA' | 'ABERTA' | 'FINALIZADA' | 'REJEITADA';
    ata: Ata;
    processos: Array<Processo>;
}
