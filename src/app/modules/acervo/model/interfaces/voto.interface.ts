import { Ministro } from "./ministro.interface";

export interface VotoDoMinistro {
    ministro: Ministro;
    voto: Voto;
}

export interface Voto {
    incluir_voto: boolean;
    ja_votou: boolean;
    pode_votar: boolean;
}