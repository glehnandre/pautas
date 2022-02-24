import { Ministro } from "./ministro.interface";
import { Suspensao } from "./suspencao.interface";

export interface Vista extends Suspensao{
    type: string;
    ministro: Ministro;
    dataDevolucao: Date;
}

export class Vista implements Vista{
    type = "vista";
    

}

