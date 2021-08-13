import { Ministro } from "./ministro.interface";

export enum NomeDoColegiado {
    'Primeira Turma' = 'primeira-turma', 
    'Segunda Turma' = 'segunda-turma', 
    'Pleno' = 'pleno',
}

export interface Colegiado {
    nome: NomeDoColegiado;
    presidente: Ministro;
    composicao: Ministro[];
    data: string;
}