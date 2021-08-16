import { Ministro } from "./ministro.interface";

export interface Cadeira {
    numero: number;
    criacao: string;
    ocupante?: Ministro;
}