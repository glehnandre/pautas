import { Component, Input, OnInit } from '@angular/core';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { MinistroService } from 'app/modules/services/ministro.service';

@Component({
  selector: 'app-composicao',
  templateUrl: './composicao.component.html',
  styleUrls: ['./composicao.component.scss']
})

export class ComposicaoComponent implements OnInit {

  constructor(
    private _ministroService: MinistroService,
  ) { }


  @Input() presidente: Ministro;

  ministros: Ministro[];
  primeiraTurma: Ministro[];
  segundaTurma: Ministro[];

  ngOnInit(): void {
    this._ministroService.listarMinistros().subscribe(ministros=>{
      this.ministros = ministros;
    });
    this._ministroService.listarMinistrosDoColegiado('primeira-turma').subscribe(ministros=>{
      this.primeiraTurma = ministros;
    })
    this._ministroService.listarMinistrosDoColegiado('segunda-turma').subscribe(ministros=>{
      this.segundaTurma = ministros;
    });
  }

}
