import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AlertaService } from 'app/modules/services/alerta.service';
import { MinistroService } from 'app/modules/services/ministro.service';
import { Ministro } from 'app/shared/model/interfaces/ministro.interface';

interface Presenca {
    presidencia: Ministro;
    presentes: Ministro[];
    ausentes: Ministro[];
}
interface Turmas {
    'pleno': Ministro;
    'primeira-turma': Ministro[];
    'segunda-turma': Ministro[];
}
const colegiados = ['primeira-turma', 'segunda-turma'];

@Component({
  selector: 'app-composicao',
  templateUrl: './composicao.component.html',
  styleUrls: ['./composicao.component.scss']
})

export class ComposicaoComponent implements OnInit {

  constructor(
    private _ministroService: MinistroService,
    private _alertaService: AlertaService,
  ) { }

  @Input() listaPresenca: Presenca;
  @Output() statusComposicao = new EventEmitter<any>();

  ministros: Turmas = {} as Turmas;

  errorMessage: string;

  /**
   * On init
   */
  ngOnInit(): void {
    this._ministroService.listarMinistrosDoColegiado('primeira-turma').subscribe({
      next: (ministros) => {
        this.ministros['primeira-turma'] = ministros;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error.message
        this._alertaService.exibirAlerta("Error");
      }
    })
    this._ministroService.listarMinistrosDoColegiado('segunda-turma').subscribe(
      {
        next: (ministros) => {
          this.ministros['segunda-turma'] = ministros;
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = error.message
          this._alertaService.exibirAlerta("Error");
        }
    });
    this._ministroService.listarColegiados('pleno', null, null).subscribe({
        next: (colegiado) => {
          this.ministros.pleno = colegiado[0].presidente as Ministro;
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = error.message
          this._alertaService.exibirAlerta("Error");
        }
    });
    if(this.listaPresenca.presidencia) this.emiteComposicao();
  }

  /**
   * Verifica se o checkbox do ministro está marcado.
   * @param nome nome do ministro
   */
  isChecked(nome: string): boolean{
    return this.listaPresenca.presidencia.nome == nome;
  }

  /**
   * Atualiza o status do checkbox do ministro
   * @param event evento que é retornado do checkbox
   * @param colegiado colegiado ao qual o ministro pertence
   */
  check(event: MatCheckboxChange, colegiado: string){
    const ministro = JSON.parse(JSON.stringify(event.source.name));

    if(event.checked){
      this.listaPresenca.presidencia = ministro;
    }
    else{
      this.listaPresenca.presidencia = {} as Ministro;
    }

    this.emiteComposicao();
  }

  /**
   * @description com base no ID do ministro, verifica se está na listaPresenca
   * no vetor com tipo:`presentes` ou `ausentes` se estiver retorna true, caso
   * contrário false
   * @param ministroID
   * @param tipo 'presentes' ou 'ausentes'
   * @author Rodrigo Carvalho dos Santos
   */
  presencaRegistrada(ministroID: number, tipo: 'presentes'|'ausentes'): boolean {
    return this.listaPresenca[tipo].findIndex(
      ({ id }) => ministroID == id) != -1
  }

  /**
   * Atualiza a lista de ministros presentes
   * @param event evento que é retornado do checkbox
   * @param colegiado colegiado ao qual o ministro pertence
   */
  atualizaPresenca(event: MatCheckboxChange, tipo: 'presentes'|'ausentes'){
    const ministro = JSON.parse(JSON.stringify(event.source.name));
    console.error(ministro);
    if(event.checked) {
      const tipo_contrario = tipo == 'presentes'? 'ausentes' : 'presentes';
      this.listaPresenca[tipo].push(ministro);
      const index = this.listaPresenca[tipo_contrario].findIndex(({ id }) => id == ministro.id);
      if(index != -1) this.listaPresenca[tipo_contrario].splice(index, 1);
    }
    else {
      const index = this.listaPresenca[tipo].findIndex(({ id }) => id == ministro.id);
      if(index != -1) console.error(this.listaPresenca[tipo].splice(index, 1));
    }
    this.emiteComposicao();
  }

  /**
   * Emite a composição da sessão
   */
  emiteComposicao(){
    this.statusComposicao.emit( this.listaPresenca );
  }
}
