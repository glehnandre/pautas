import { Component, OnInit } from '@angular/core';
import { TarefaService } from 'app/modules/services/tarefa.service';

@Component({
  selector: 'app-lista-de-taferas',
  templateUrl: './lista-de-taferas.component.html',
  styleUrls: ['./lista-de-taferas.component.scss']
})
export class ListaDeTaferasComponent implements OnInit {

  constructor(
      private _tarefaService: TarefaService,
  ) { }

  ngOnInit(): void {
    this._tarefaService.obterTaferas().subscribe({
        next: (data) => console.log(data)
    });
  }

}
