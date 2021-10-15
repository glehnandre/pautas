import { Pipe, PipeTransform } from '@angular/core';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';


@Pipe({
    name: 'filtroSessoes'
})
export class SessoesPipe implements PipeTransform {
    transform(sessoes: SessaoJulgamento[], colegiado: string, modalidade: string, dataInicio: Date, dataFim: Date) {
        console.log('%c Data Inicio', 'color:blue; font-weight: bold; font-size: 20px;');
        console.log({colegiado, modalidade, dataInicio, dataFim });
        if (!colegiado && !modalidade && !dataInicio && !dataFim) {
            return sessoes;
        } else
            {return sessoes.filter(sessao =>
                //incluir aqui a logica para que não seja necessário que todos os filtros estejam preechidos para serem utilizados. Outra alternativa é cirar um pipe para cada tipo de atributo
                 sessao.colegiado === colegiado

            ).filter(sessao=>sessao.modalidade === modalidade);}
    }

}
