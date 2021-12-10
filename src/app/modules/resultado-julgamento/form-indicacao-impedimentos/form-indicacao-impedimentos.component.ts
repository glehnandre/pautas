import { Component, OnInit } from '@angular/core';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { MinistroService } from 'app/modules/services/ministro.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-indicacao-impedimentos',
  templateUrl: './form-indicacao-impedimentos.component.html',
  styleUrls: ['./form-indicacao-impedimentos.component.scss']
})
export class FormIndicacaoImpedimentosComponent implements OnInit {

  ministros$: Observable<Ministro[]>;

  constructor(
    private _ministroService: MinistroService,
  ) { }

  ngOnInit(): void {
    this.ministros$ = this._ministroService.listarMinistros();
  }

}
