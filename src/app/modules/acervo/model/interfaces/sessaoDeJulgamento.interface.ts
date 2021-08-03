export interface SessaoDeJulgamento {
    id: number;
    numero: number;
    ano: number;
    colegiado: string;
    tipo: string;
    categoria: string;
    modalidade: string;
    data_inicio: Date;
    data_fim: Date;
    secretario?: {
        id: number;
        nome: string;
    };
}