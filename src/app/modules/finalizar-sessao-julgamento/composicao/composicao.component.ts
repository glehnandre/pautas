import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { MinistroService } from 'app/modules/services/ministro.service';


interface presienteChecked {
    nome: string;
    checked: boolean;
}

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

  presienteChecked: presienteChecked[] = [];
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


  isChecked(nome: string): boolean{
    const presidente = this.presienteChecked.find(presidente=>presidente.nome==nome);
    if(presidente) return presidente.checked;
    return false;
  }

  checked(event: MatCheckboxChange){
    this.presienteChecked.forEach(presidente=>{
      if(event.source.name == presidente.nome) presidente.checked = event.checked;
      else presidente.checked = false;
    })
  }
}
