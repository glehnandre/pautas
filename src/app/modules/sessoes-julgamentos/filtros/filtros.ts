import { Ministro } from "app/modules/acervo/model/interfaces/ministro.interface";

export interface Filtros {
    termo: string;
    relatoria: Ministro[];
    listas: string[];
    temas: string[];
    classes: string[];
}
