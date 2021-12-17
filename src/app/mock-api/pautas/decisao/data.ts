import { Ata } from "app/modules/acervo/model/interfaces/ata.interface";
import { DecisoesResultadoJulgamento } from "app/modules/acervo/model/interfaces/decisao.interface";
import { TipoCapitulo } from "app/modules/acervo/model/enums/tipoCapitulo.enum";
import { ModeloDecisao } from "app/modules/acervo/model/interfaces/modeloDecisao.interface";
import { dispositivos } from "../dispositivo/data";
import { capitulo } from "../capitulo/data"
import { sessao } from "../sessoes-julgamento/data";
import { processo } from "../processos/data";

export const decisoes: DecisoesResultadoJulgamento[] = [
  {
    decisoes: [
      {
        capitulo: capitulo[0],
        processos_mesma_decisao: [
          processo[0],
          processo[1],
        ],
        vistas: [
          {
            id: 1,
            data: '2016-08-29T09:12:33.001Z',
            processo: 1231,
            ministro: 12313,
            sessao: 123,
            texto: "Após o voto do Ministro Marco Aurélio, Relator, que implementava a ordem, pediu vista dos autos o Ministro Alexandre de Moraes. Primeira Turma, Sessão Virtual de 13.11.2020 a 20.11.2020."
          }
        ],
        destaques: [
          {
            id: 1,
            data: '2016-08-29T09:12:33.001Z',
            processo: 1231,
            ministro: 12313,
            sessao: 123,
            texto: "Após o voto do Ministro Marco Aurélio, Relator, que implementava a ordem, pediu destaque do processo do plenário virtual."
          }
        ],
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
