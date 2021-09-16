import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResultadoJulgamentoService } from '../services/resultado-julgamento.service';

@Component({
  selector: 'app-resultado-julgamento',
  templateUrl: './resultado-julgamento.component.html',
  styleUrls: ['./resultado-julgamento.component.scss']
})
export class ResultadoJulgamentoComponent implements OnInit {

  dados: any;

  constructor(
    private resultadoJulgamento: ResultadoJulgamentoService,
  ) { }

  ngOnInit(): void {
    this.resultadoJulgamento.listarDecisoes().subscribe({
      next: (data) => {
        this.dados = data;
        console.log(data)
      }
    });
  }
}
