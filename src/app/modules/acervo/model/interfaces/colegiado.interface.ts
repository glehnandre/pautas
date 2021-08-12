import { Ministro } from "./ministro.interface";

export interface Colegiado {
    nome: 'Primeira Turma' | 'Segunda Turma' | 'Pleno';
    presidente: Ministro;
    composicao: Ministro[];
    data: string;
}