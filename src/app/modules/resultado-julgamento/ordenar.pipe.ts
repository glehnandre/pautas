import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenar'
})
export class OrdenarPipe implements PipeTransform {

  transform(value: Array<any>, ...args: string[]): Array<any> {
    const listaOrdenada = value.sort((a, b) => {
      // A remoção dos acentos garante uma ordenação mais precisa
      const paramA = this._removerAcento(a.capitulo.tipo);
      const paramB = this._removerAcento(b.capitulo.tipo);

      if (paramA > paramB) return 1;
      if (paramA < paramB) return -1;

      return 0;
    });

    console.log(listaOrdenada)
    return listaOrdenada;
  }

  /**
   * @private Método privado
   * @param value Palavra na qual se quer remover qualquer tipo de acentuação
   * @description Método para remover as acentos de uma string
   * @returns Retorna a string sem acentuação
   */
  private _removerAcento(value: string): string {
    return value.normalize("NFD");
  }

}
