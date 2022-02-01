import { AfterViewChecked, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { MinistroService } from 'app/modules/services/ministro.service';


interface presidenteChecked {
    nome: string;
    checked: boolean;
}

@Component({
  selector: 'app-composicao',
  templateUrl: './composicao.component.html',
  styleUrls: ['./composicao.component.scss']
})

export class ComposicaoComponent implements OnInit, AfterViewChecked {

  constructor(
    private _ministroService: MinistroService,
  ) { }

  @Input() presidente: Ministro;
  @Output() statusComposicao = new EventEmitter<any>();

  presidenteChecked: presidenteChecked[] = [];
  primeiraTurma: Ministro[];
  segundaTurma: Ministro[];
  presentes: Ministro[] = [];
  ausentes: Ministro[] = [];
  presidencia: Ministro;

  /**
   * On init
   */
  ngOnInit(): void {
    this._ministroService.listarMinistrosDoColegiado('primeira-turma').subscribe(ministros=>{
      ministros.splice(ministros.indexOf(ministros.find(ministro=>ministro.nome==this.presidente.nome)), 1);
      this.primeiraTurma = ministros;
      ministros.forEach(ministro=>this.presidenteChecked.push({nome: ministro.nome, checked: false}));
    })
    this._ministroService.listarMinistrosDoColegiado('segunda-turma').subscribe(ministros=>{
      ministros.splice(ministros.indexOf(ministros.find(ministro=>ministro.nome==this.presidente.nome)), 1);
      this.segundaTurma = ministros;
      ministros.forEach(ministro=>this.presidenteChecked.push({nome: ministro.nome, checked: false}));
    });
  }

  /**
   * After view checked
   */
  ngAfterViewChecked(): void{
    if(this.presidente) 
    if(this.presidenteChecked.indexOf({nome: this.presidente.nome, checked: false})==-1) this.presidenteChecked.push({nome: this.presidente.nome, checked: false});
  }

  /**
   * Verifica se o checkbox do ministro está marcado.
   * @param nome nome do ministro
   */
  isChecked(nome: string): boolean{
    const presidente = this.presidenteChecked.find(presidente=>presidente.nome==nome);
    if(presidente) return presidente.checked;
    return false;
  }

  /**
   * Atualiza o status do checkbox do ministro
   * @param event evento que é retornado do checkbox
   * @param colegiado colegiado ao qual o ministro pertence
   */
  check(event: MatCheckboxChange, colegiado: string){
    const nome = event.source.name;
    this.presidenteChecked.forEach(presidente=>{
      if(nome == presidente.nome) presidente.checked = event.checked;
      else presidente.checked = false;
    })
    
    if(event.checked){
      if(colegiado=="presidente")
        this.presidencia = this.presidente;
      else if(colegiado=="primeira-turma")
        this.presidencia = this.primeiraTurma.find(ministro=>ministro.nome==nome);
      else this.presidencia = this.segundaTurma.find(ministro=>ministro.nome==nome);
    }
    else{
      this.presidencia = {} as Ministro;
    }

    this.emiteComposicao();
  }

  /**
   * Atualiza a lista de ministros presentes
   * @param event evento que é retornado do checkbox
   * @param colegiado colegiado ao qual o ministro pertence
   */
  atualizaPresentes(event: MatCheckboxChange, colegiado: string){
    const nome = event.source.name;

    if(colegiado=="presidente"){
      if(event.checked){
        this.presentes.push(this.presidente);
        const index = this.ausentes.indexOf(this.presidente);
        if(index!=-1)
          this.ausentes.splice(index, 1);
      }
      else this.presentes.splice(this.presentes.indexOf(this.presidente), 1);
    }

    else if(colegiado=="primeira-turma"){
      if(event.checked){
        this.presentes.push(this.primeiraTurma.find(ministro=>ministro.nome==nome));
        const index = this.ausentes.indexOf(this.primeiraTurma.find(ministro=>ministro.nome==nome));
        if(index!=-1)
          this.ausentes.splice(index, 1);
      }
      else this.presentes.splice(this.presentes.indexOf(this.presentes.find(ministro=>ministro.nome==nome)), 1)
    }

    else if(colegiado=="segunda-turma"){
      if(event.checked){
        this.presentes.push(this.segundaTurma.find(ministro=>ministro.nome==nome));
        const index = this.ausentes.indexOf(this.segundaTurma.find(ministro=>ministro.nome==nome));
        if(index!=-1)
          this.ausentes.splice(index, 1);
      }
      else this.presentes.splice(this.presentes.indexOf(this.presentes.find(ministro=>ministro.nome==nome)), 1)
    }
    
    this.emiteComposicao();
  }

  /**
   * Atualiza a lista de ministros ausentes
   * @param event evento que é retornado do checkbox
   * @param colegiado colegiado ao qual o ministro pertence
   */
  atualizaAusentes(event: MatCheckboxChange, colegiado: string){
    const nome = event.source.name;

    if(colegiado=="presidente"){
      if(event.checked){
        this.ausentes.push(this.presidente);
        const index = this.presentes.indexOf(this.primeiraTurma.find(ministro=>ministro.nome==nome));
        if(index!=-1)
          this.presentes.splice(index, 1);
      }
      else this.ausentes.splice(this.ausentes.indexOf(this.presidente), 1);
    }

    else if(colegiado=="primeira-turma"){
      if(event.checked){
        this.ausentes.push(this.primeiraTurma.find(ministro=>ministro.nome==nome));
        const index = this.presentes.indexOf(this.primeiraTurma.find(ministro=>ministro.nome==nome));
        if(index!=-1)
          this.presentes.splice(index, 1);
      }
      else this.ausentes.splice(this.ausentes.indexOf(this.ausentes.find(ministro=>ministro.nome==nome)), 1)
    }

    else if(colegiado=="segunda-turma"){
      if(event.checked){
        this.ausentes.push(this.segundaTurma.find(ministro=>ministro.nome==nome));
        const index = this.presentes.indexOf(this.segundaTurma.find(ministro=>ministro.nome==nome));
        if(index!=-1)
          this.presentes.splice(index, 1);
      }
      else this.ausentes.splice(this.ausentes.indexOf(this.ausentes.find(ministro=>ministro.nome==nome)), 1)
    }

    this.emiteComposicao();
  }

  /**
   * Emite a composição da sessão
   */
  emiteComposicao(){
    this.statusComposicao.emit({
      presidencia: this.presidencia,
      presentes: this.presentes,
      ausentes: this.ausentes
    })
  }
}
