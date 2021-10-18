import { Decisao, DecisoesResultadoJulgamento } from "app/modules/acervo/model/interfaces/decisao.interface";
import { Processo } from "app/modules/acervo/model/interfaces/processo.interface";
import { SessaoJulgamento } from "app/modules/acervo/model/interfaces/sessao-julgamento.interface";
import { ministro } from "../ministro/data";
import { processo } from "../processos/data";
import { sessao } from "../sessoes-julgamento/data";

export const decisoes: Array<DecisoesResultadoJulgamento> = [
  {
    decisoes: [
      {
        capitulo: {
          descricao: '',
          dispositivo: '',
          ministro_condutor: '',
          ministros_acordam: [
            ministro[0],
            ministro[1],
            ministro[2],
            ministro[3],
            ministro[4],
            ministro[5],
          ],
          texto: '',
          tipo: '',
        },
        processos_mesma_decisao: [
          processo[0],
          processo[1],
          processo[2],
        ],
      }
    ],
    sessao: sessao[0],
  }
];