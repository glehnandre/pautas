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
  primeiraTurma: Ministro[];
  segundaTurma: Ministro[];
  presentes: Ministro[] = [];
  ausentes: Ministro[] = [];

  ngOnInit(): void {
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

  check(event: MatCheckboxChange){
    this.presienteChecked.forEach(presidente=>{
      if(event.source.name == presidente.nome) presidente.checked = event.checked;
      else presidente.checked = false;
    })
  }

  atualizaPresentes(event: MatCheckboxChange, colegiado: string){
    const nome = event.source.name;

    if(colegiado=="presidente"){
      if(event.checked){
        this.presentes.push(this.presidente);
        this.ausentes.splice(this.ausentes.indexOf(this.presidente), 1);
      }
      else this.presentes.splice(this.presentes.indexOf(this.presidente), 1);
    }

    else if(colegiado=="primeira-turma"){
      if(event.checked){
        this.presentes.push(this.primeiraTurma.find(ministro=>ministro.nome==nome));
        this.ausentes.splice(this.ausentes.indexOf(this.primeiraTurma.find(ministro=>ministro.nome==nome)), 1);
      }
      else this.presentes.splice(this.presentes.indexOf(this.presentes.find(ministro=>ministro.nome==nome)), 1)
    }

    else if(colegiado=="segunda-turma"){
      if(event.checked){
        this.presentes.push(this.segundaTurma.find(ministro=>ministro.nome==nome));
        this.ausentes.splice(this.ausentes.indexOf(this.segundaTurma.find(ministro=>ministro.nome==nome)), 1);
      }
      else this.presentes.splice(this.presentes.indexOf(this.presentes.find(ministro=>ministro.nome==nome)), 1)
    }
  }

  atualizaAusentes(event: MatCheckboxChange, colegiado: string){
    const nome = event.source.name;

    if(colegiado=="presidente"){
      if(event.checked){
        this.ausentes.push(this.presidente);
        this.presentes.splice(this.presentes.indexOf(this.presidente), 1);
      }
      else this.ausentes.splice(this.ausentes.indexOf(this.presidente), 1);
    }

    else if(colegiado=="primeira-turma"){
      if(event.checked){
        this.ausentes.push(this.primeiraTurma.find(ministro=>ministro.nome==nome));
        this.presentes.splice(this.presentes.indexOf(this.primeiraTurma.find(ministro=>ministro.nome==nome)), 1);
      }
      else this.ausentes.splice(this.ausentes.indexOf(this.ausentes.find(ministro=>ministro.nome==nome)), 1)
    }

    else if(colegiado=="segunda-turma"){
      if(event.checked){
        this.ausentes.push(this.segundaTurma.find(ministro=>ministro.nome==nome));
        this.presentes.splice(this.presentes.indexOf(this.segundaTurma.find(ministro=>ministro.nome==nome)), 1);
      }
      else this.ausentes.splice(this.ausentes.indexOf(this.ausentes.find(ministro=>ministro.nome==nome)), 1)
    }
  }
}
