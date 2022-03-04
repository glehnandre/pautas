import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenar'
})
export class OrdenarPipe implements PipeTransform {

  transform(value: Array<any>, ...args: string[]): Array<any> {
    const chave = args[0]; // valor base da ordenação
    const ordem = args[1]; // ASC ou DESC

    return value.sort((a, b) => {
      if (new Date(a[chave]).getTime() > new Date(b[chave]).getTime()) {
        return (ordem.toLocaleLowerCase() === 'asc') ? 1 : -1;
      }

      if (new Date(a[chave]).getTime() < new Date(b[chave]).getTime()) {
        return (ordem.toLocaleLowerCase() === 'asc') ? -1 : 1;
      }

      return 0;
    });
  }

}
