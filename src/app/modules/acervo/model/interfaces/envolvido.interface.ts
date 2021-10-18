export interface Envolvido{
    id: number;
    pessoaId: number;
    nome: string;
    identificacoes: string[];
    parteId: number;
    Polo: {
        descricao: string;
        sigla: string;
    }
    categoria: string;
}