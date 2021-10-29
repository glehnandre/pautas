import { TipoCapitulo } from "app/modules/acervo/model/enums/tipoCapitulo.enum";
import { DecisoesResultadoJulgamento } from "app/modules/acervo/model/interfaces/decisao.interface";
import { ministro } from "../ministro/data";
import { processo } from "../processos/data";
import { sessao } from "../sessoes-julgamento/data";

export const decisoes: Array<DecisoesResultadoJulgamento> = [
  {
    decisoes: [
      {
        capitulo: {
          id: 1,
          tipo: TipoCapitulo.Modulacao,
          descricao: 'Descrição do capítulo',
          dispositivo: 'Dispositivo',
          ministro_condutor: ministro[6],
          ministros_acordam: [
            ministro[0],
            ministro[1],
            ministro[2],
            ministro[3],
            ministro[4],
            ministro[5],
          ],
          ministros_impedidos: [
            ministro[7],
          ],
          ministros_suspeitos: [
            ministro[8],
          ],
          texto: 'Texto do capítulo',
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