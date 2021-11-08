import { Capitulo } from "./capitulo.interface";
import { Ministro } from "./ministro.interface";
import { Processo } from "./processo.interface";
import { SessaoJulgamento } from "./sessao-julgamento.interface";

export interface Decisao {
    descricao: string;
    tipo: string;
    dispositivo: string;
    ministros_acordam: Array<Ministro>;
    ministro_condutor: string;
    texto: string;
}

export interface DecisoesResultadoJulgamento {
    decisoes: Array<{
        capitulo: Capitulo;
        processos_mesma_decisao: Processo[];
    }>;
    sessao: SessaoJulgamento;
}
