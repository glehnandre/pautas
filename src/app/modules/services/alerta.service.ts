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

}
