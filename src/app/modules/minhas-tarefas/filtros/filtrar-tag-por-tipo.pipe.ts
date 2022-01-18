import { Pipe, PipeTransform } from '@angular/core';
import { ITaskTag } from 'app/modules/acervo/model/interfaces/itask.interface';

@Pipe({
  name: 'filtrarTagPorTipo'
})
export class FiltrarTagPorTipoPipe implements PipeTransform {

  transform(value: ITaskTag[], ...args: string[]): ITaskTag[] {
    const tipo = args[1];
    const tagsFiltradasPorTipo = value.filter(tag => tag.type === tipo);
    //console.log(value)
    return tagsFiltradasPorTipo;
  }

}
