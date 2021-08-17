import { Ministro } from "./ministro.interface";

export interface Composicao {
    ministro: Ministro,
    pode_votar: boolean,
    votou: boolean
}