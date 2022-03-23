import { Component, OnInit } from '@angular/core';
import { FuseAlertService } from '@fuse/components/alert';
import { FuseDrawerService } from '@fuse/components/drawer';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';
import { Observable } from 'rxjs';
import { AlertaService } from '../services/alerta.service';
import { SessaoDeJulgamentoService } from '../services/sessao-de-julgamento.service';

@Component({
  selector: 'app-sessoes-julgamento',
  templateUrl: './sessoes-julgamento.component.html',
  styleUrls: ['./sessoes-julgamento.component.scss']
})
export class SessoesJulgamentoComponent implements OnInit {
  
  alerta: { titulo: string; mensagem: string, tipo: 'warning' | 'success' | 'error'; } = null;
  displayedColumns: string[] = ['Sessão', 'Colegiado', 'Situação', 'Tipo'];
  _data : Observable<SessaoDeJulgamento[]>;

  constructor(
    private _sessaoDeJulgamentoService: SessaoDeJulgamentoService,
    private _fuseAlertService: FuseAlertService,
    private _alertaService: AlertaService,
    private _fuseDrawerService: FuseDrawerService, 
  ) { 

  }


  /**
   * Toggle the drawer open
   *
   * @param drawerName
   */
  toggleDrawerOpen(drawerName): void {
    const drawer = this._fuseDrawerService.getComponent(drawerName);
    drawer.toggle();
  }

  /**
   * Check if open
   *
   * @param drawerName
   */
  isOpen(drawerName): boolean {
    const drawer = this._fuseDrawerService.getComponent(drawerName);
    return drawer.opened;
  }

  ngOnInit(): void {
    this._data = this._sessaoDeJulgamentoService.listarTodasAsSessoesDeJulgamento();
  }

}
