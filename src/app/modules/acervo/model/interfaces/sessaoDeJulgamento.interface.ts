import { Composicao } from "./composicao.interface";
import { Ministro } from "./ministro.interface";

export interface SessaoDeJulgamento {
    id: number;
    numero: number;
    ano: number;
    colegiado: {
        nome: string;
        presidente: Ministro;
        composicao: Composicao[],
        data: string;
    }
    tipo: string;
    categoria: string;
    modalidade: string;
    data_inicio: string;
    data_fim: string;
    secretario?: {
        id: number;
        nome: string;
    };
    situacao: string;
}