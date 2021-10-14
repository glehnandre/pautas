import { TipoCapitulo } from "../enums/tipoCapitulo.enum";

export interface Capitulo {
    id: number;
    descricao: string;
    ordem: number;
    tipo: TipoCapitulo;
    dispositivo: string;
}