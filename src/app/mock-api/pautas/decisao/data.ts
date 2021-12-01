import { TipoCapitulo } from "app/modules/acervo/model/enums/tipoCapitulo.enum";
import { DecisoesResultadoJulgamento } from "app/modules/acervo/model/interfaces/decisao.interface";
import { ministro } from "../ministro/data";
import { processo } from "../processos/data";
import { sessao } from "../sessoes-julgamento/data";

export const decisoes: Array<DecisoesResultadoJulgamento> = [
  {
    decisoes: [
      
    ],
    sessao: sessao[0],
  }
];
