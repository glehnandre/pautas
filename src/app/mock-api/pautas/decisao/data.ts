import { TipoCapitulo } from "app/modules/acervo/model/enums/tipoCapitulo.enum";
import { ModeloDecisao } from "app/modules/acervo/model/interfaces/modeloDecisao.interface";
import { dispositivos } from "../dispositivo/data";
import { getStorage } from "../storage";

export const modeloDecisao: ModeloDecisao[] = getStorage('modelosDecisao', [
  {
    id: 1,
    classe: 'ADI',
    dispositivo: dispositivos[0],
    recurso: 1,
    texto: 'Após o voto do Ministro relator @relator que dava provimento ao recurso extraordinário, de modo a conceder a segurança, e fixava a seguinte teste (tema 1.2021 de repercussão geral).',
    tipoCapitulo: TipoCapitulo.Merito,
  }
]);
