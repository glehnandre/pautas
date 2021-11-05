import { Component, Input, OnInit } from '@angular/core';
import { InformacoesDto } from 'app/modules/acervo/model/interfaces/informacoesDto.interface';


@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {

  @Input() agregacoes: InformacoesDto[] = [];

  data_inicio: string = '';
  data_fim: string = '';

  constructor() { }

  ngOnInit(): void {
    //this.agregacoes[0].
  }

  emiteData(){

  }

  filtrar(){
    
  }
  

}
