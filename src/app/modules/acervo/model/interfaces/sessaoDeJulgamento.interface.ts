export interface SessaoDeJulgamento {
    id: number;
    numero: number;
    ano: number;
    colegiado: string;
    tipo: string;
    categoria: string;
    modalidade: string;
    data_inicio: string;
    data_fim: string;
    secretario?: {
        id: number;
        nome: string;
    };
    situacao?: "PUBLICADA" | "APROVADA" | "FECHADA" | "ABERTA" | "FINALIZADA" | "REJEITADA";
}