import { Processo } from "./processo.interface";

export interface Pauta {
    data_inicio: string;
    data_fim: string;
    assunto: string;
    colegiado: string;
    pautas: Processo[],
}