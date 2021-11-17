import { Injectable } from '@angular/core';
import { FuseAlertService } from '@fuse/components/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(
    private _fuseAlertService: FuseAlertService,
  ) { }

  public exibirAlertaDeSucesso(tempo: number = 5000): void {
    this._fuseAlertService.show('sucesso');

    setTimeout(() => {
        this._fuseAlertService.dismiss('sucesso');
    }, tempo);
  }

  public exibirAlertaDeErro(nomeDoAlerta: string, tempo: number = 5000): void {
    this._fuseAlertService.show(nomeDoAlerta);

    setTimeout(() => {
        this._fuseAlertService.dismiss(nomeDoAlerta);
    }, tempo);
  }

  /**
   * @public Método público
   * @description Método que exibe o componente de alerta
   * @param nomeDoAlerta Nome do componente de alerta
   * @param tempo Tempo em milisengundos que o alerta ficará visível, por padrão,
   *              o alerta será exibido durante 5 segundos
   * @author Douglas da Silva Monteles
   */
  public exibirAlerta(nomeDoAlerta: string, tempo: number = 5000): void {
    this._fuseAlertService.show(nomeDoAlerta);

    setTimeout(() => {
        this._fuseAlertService.dismiss(nomeDoAlerta);
    }, tempo);
  }

}
