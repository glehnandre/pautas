import { Pipe, PipeTransform } from "@angular/core";
import { SessaoJulgamento } from "./sessaoJulgamento";

@Pipe({
    name: 'filtroSessoes'
})
export class SessoesPipe implements PipeTransform {
    transform(sessoes: SessaoJulgamento[], colegiado: string, dataInicio: Date, dataFim: Date) {
        if (!colegiado && !dataInicio && !dataFim) {
            return sessoes;
        } else

            return sessoes.filter(sessao => {
                //incluir aqui a logica para que não seja necessário que todos os filtros estejam preechidos para serem utilizados. Outra alternativa é cirar um pipe para cada tipo de atributo e concatená-los
                    return sessao.colegiado === colegiado;
            }
            );
    }

}
