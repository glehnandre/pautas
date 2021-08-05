import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-julgamento-extraordinario',
  templateUrl: './julgamento-extraordinario.component.html',
  styleUrls: ['./julgamento-extraordinario.component.scss']
})
export class JulgamentoExtraordinarioComponent implements OnInit {

  tags: string[] = ['Virtual', 'Segunda Turma'];

  constructor() { }

  ngOnInit(): void {
    
  }

}
