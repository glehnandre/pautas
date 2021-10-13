import { Ministro } from "./ministro.interface";

export interface Decisao {
    descricao: string;
    tipo: string;
    dispositivo: string;
    ministros_acordam: Array<Ministro>;
    ministro_condutor: string;
    texto: string;
}