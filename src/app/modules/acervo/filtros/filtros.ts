export interface Filtros {
    termo: string;
    primeira_turma: boolean;
    segunda_turma: boolean;
    pleno: boolean;
    situacoes: string[];
    classes: string[];
    tags: string[];
    processo?: string;
}