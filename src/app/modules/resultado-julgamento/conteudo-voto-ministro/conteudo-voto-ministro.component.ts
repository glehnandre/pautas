import { Component, Input, OnInit } from '@angular/core';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { Voto } from 'app/modules/acervo/model/interfaces/voto.interface';

@Component({
  selector: 'app-conteudo-voto-ministro',
  templateUrl: './conteudo-voto-ministro.component.html',
  styleUrls: ['./conteudo-voto-ministro.component.scss']
})
export class ConteudoVotoMinistroComponent implements OnInit {

  @Input() voto: Voto;

  constructor() { }

  ngOnInit(): void {
    
  }

  /**
   * @public Método público
   * @description Método para realizar a conversão de uma string em base64 para 
   *              HTML
   * @returns string
   * @author Douglas da Silva Monteles
   */
  public converterDeBase64ParaHtml(): string {
    if (this.voto && this.voto.conteudo) {
      return this._fromBinary(this.voto.conteudo);
    }
    
    return 'aguarde...';
  }

  /**
   * @private Método private
   * @param binario Conteúdo em binário
   * @description Método para converter um binário para string
   * @author Douglas da Silva Monteles
   */
  private _fromBinary(binario: string): string {
    const bytes = new Uint8Array(binario.length);

    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = binario.charCodeAt(i);
    }

    const charCodes = new Uint16Array(bytes.buffer);

    let resultado = '';

    for (let i = 0; i < charCodes.length; i++) {
      resultado += String.fromCharCode(charCodes[i]);
    }

    return resultado;
  }

}
