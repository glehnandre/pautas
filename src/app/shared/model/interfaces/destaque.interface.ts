import { Ministro } from "./ministro.interface";
import { Suspensao } from "./suspencao.interface";

export interface Destaque extends Suspensao {
    type: string;
    ministro: Ministro;
}

export class Destaque implements Destaque{
    type = "destaque";
}