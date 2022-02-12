import { Ministro } from "app/shared/model/interfaces/ministro.interface";


export interface Filtros {
    termo: string;
    relatoria: Ministro[];
    listas: string[];
    temas: string[];
    classes: string[];
}
