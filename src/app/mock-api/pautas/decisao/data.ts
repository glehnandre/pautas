import { Ata } from "app/modules/acervo/model/interfaces/ata.interface";
import { Decisao, DecisoesResultadoJulgamento } from "app/modules/acervo/model/interfaces/decisao.interface";
import { Processo } from "app/modules/acervo/model/interfaces/processo.interface";
import { SessaoJulgamento } from "app/modules/acervo/model/interfaces/sessao-julgamento.interface";

import { capitulo } from "../capitulo/data"
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

export const ata: Ata = {
    total_julgados: 4,
    total_vista: 2,
    total_destaque: 3,
    total_nao_julgados: 6,
    total_suspensos: 1,
    "capitulos para publicacao": [
      {
        classe: "string",
        numero: "string",
        cadeia: "string",
        relator: ministro[0],
        redator: ministro[10],
        capitulos: [
          capitulo[0],
          capitulo[1],
          capitulo[2],
        ]
      }
    ]
  }
