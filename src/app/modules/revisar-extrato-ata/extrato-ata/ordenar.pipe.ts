import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenar'
})
export class OrdenarPipe implements PipeTransform {

  transform(value: Array<any>, ...args: string[]): Array<any> {
    const chave = args[0];

    return value.sort((a, b) => {
      if (a[chave] > b[chave]) return -1;
      if (a[chave] < b[chave]) return 1;
      return 0;
    });
  }

}
