import { Ministro } from "app/modules/acervo/model/interfaces/ministro.interface";

export interface Filtros {
    termos: string[];
    relatoria: Ministro[];
    listas: string[];
    temas: string[];
    classes: string[];
}
