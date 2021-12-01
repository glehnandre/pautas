import { Capitulo } from "./capitulo.interface";
import { Processo } from "./processo.interface";
import { SessaoJulgamento } from "./sessao-julgamento.interface";

export interface DecisoesResultadoJulgamento {
    decisoes: Array<{
        capitulo: Capitulo;
        processos_mesma_decisao: Processo[];
    }>;
    sessao: SessaoJulgamento;
}
