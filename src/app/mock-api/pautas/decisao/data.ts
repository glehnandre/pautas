import { Ata } from "app/modules/acervo/model/interfaces/ata.interface";
import { DecisoesResultadoJulgamento } from "app/modules/acervo/model/interfaces/decisao.interface";
import { TipoCapitulo } from "app/modules/acervo/model/enums/tipoCapitulo.enum";
import { ModeloDecisao } from "app/modules/acervo/model/interfaces/modeloDecisao.interface";
import { dispositivos } from "../dispositivo/data";
import { capitulo } from "../capitulo/data"
import { sessao } from "../sessoes-julgamento/data";
import { destaques, processo, vistas } from "../processos/data";

export const decisoes: DecisoesResultadoJulgamento[] = [
  {
    decisoes: [
      {
        capitulo: capitulo[0],
        processos_mesma_decisao: [
          processo[0],
          processo[1],
        ],
        vistas: vistas,
        destaques: destaques,
      }
    ],
    sessao: sessao[0],
  }
];

export const modeloDecisao: ModeloDecisao[] = [
  {
    id: 1,
    classe: 'ADI',
    dispositivo: dispositivos[0],
    recurso: 1,
    texto: 'Após o voto do Ministro relator @relator que dava provimento ao recurso extraordinário, de modo a conceder a segurança, e fixava a seguinte teste (tema 1.2021 de repercussão geral).',
    tipoCapitulo: TipoCapitulo.Merito,
  }
];
