import { TipoCapitulo } from "../enums/tipoCapitulo.enum";
import { Ministro } from "./ministro.interface";

export interface Capitulo {
    id: number;
    descricao: string;
    tipo: TipoCapitulo;
    dispositivo: string;
    ministros_acordam: Array<Ministro>;
    ministros_suspeitos: Array<Ministro>;
    ministros_impedidos: Array<Ministro>;
    ministro_condutor: Ministro;
    texto: string;
}