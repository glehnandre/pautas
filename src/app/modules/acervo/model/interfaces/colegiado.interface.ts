import { Ministro } from "./ministro.interface";

export enum NomeDoColegiado {
    'Primeira Turma' = 'primeira-turma', 
    'Segunda Turma' = 'segunda-turma', 
    'Pleno' = 'pleno',
}

export interface ComposicaoColegiado {
    ministro: Ministro;
    incluir_voto: boolean;
    ja_votou: boolean;
    pode_votar: boolean;
    presidente?: boolean;
    relator?: boolean;
    redator?: boolean;
}

export interface Colegiado {
    colegiado: NomeDoColegiado;
    anoSessao: number;
    numeroSessao: number;
    composicao: Array<ComposicaoColegiado>;
    data: string;
}