import { Capitulo } from "./capitulo.interface";
import { Ministro } from "./ministro.interface";
import { Processo } from "./processo.interface";
import { SessaoJulgamento } from "./sessao-julgamento.interface";
import { Destaque, Vista } from "./vista-e-destaque.interface";

export interface DecisoesResultadoJulgamento {
    decisoes: Array<{
        capitulo: Capitulo;
        processos_mesma_decisao: Processo[];
        ministros_impedidos?: Ministro[];
        ministros_suspeitos?: Ministro[];
        vistas?: Vista[];
        destaques?: Destaque[];
    }>;
    sessao: SessaoJulgamento;
}
