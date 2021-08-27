import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { ProcessoService } from '../services/processo.service';

@Component({
  selector: 'app-sessoes-julgamentos',
  templateUrl: './sessoes-julgamentos.component.html',
  styleUrls: ['./sessoes-julgamentos.component.scss']
})
export class SessoesJulgamentosComponent implements OnInit {

  processos: Processo[];

  constructor(
    private _processoService: ProcessoService,
  ) { }

  ngOnInit(): void {
      this.processos = [];
      this._processoService.listarProcessos().subscribe({
        next: (data) => {
          this.processos = data;
          console.table(data);
        }
      });
  }

  eventsSubject: Subject<any> = new Subject<any>();

}
