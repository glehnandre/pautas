import { Ministro } from "./ministro.interface";
import { SessaoDeJulgamento } from "./sessao-julgamento.interface";

export interface Vista {
    id: number;
    data: string;
    processo: number;
    ministro: Ministro;
    sessao: SessaoDeJulgamento;
    texto: string;
}