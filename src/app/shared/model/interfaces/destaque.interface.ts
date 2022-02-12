import { Ministro } from "./ministro.interface";

export interface Destaque {
    id: number;
    data: string;
    processo: number;
    ministro: Ministro;
    sessao: number;
    texto: string;
}