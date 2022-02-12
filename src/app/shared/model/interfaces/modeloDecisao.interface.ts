import { TipoCapitulo } from "../enums/tipoCapitulo.enum";
import { Dispositivo } from "./dispositivo.interface";

export interface ModeloDecisao {
    id: number;
    dispositivo: Dispositivo;
    texto: string;
    classe: string;
    recurso: number;
    tipoCapitulo: TipoCapitulo;
}