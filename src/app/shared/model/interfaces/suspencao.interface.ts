import { SessaoDeJulgamento } from "./sessao-julgamento.interface";

export interface Suspensao {
    id: number;
    data: Date;
    processo: number;
    sessao: SessaoDeJulgamento;
    texto: string;
}

