import { TipoCapitulo } from "app/modules/acervo/model/enums/tipoCapitulo.enum";
import { DecisoesResultadoJulgamento } from "app/modules/acervo/model/interfaces/decisao.interface";
import { Dispositivo } from "app/modules/acervo/model/interfaces/dispositivo.interface";
import { ModeloDecisao } from "app/modules/acervo/model/interfaces/modeloDecisao.interface";
import { dispositivos } from "../dispositivo/data";
import { sessao } from "../sessoes-julgamento/data";

export const decisoes: Array<DecisoesResultadoJulgamento> = [
  {
    decisoes: [
      
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
    texto: '',
    tipoCapitulo: TipoCapitulo.Merito,
  }
];