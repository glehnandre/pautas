import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { MinistroService } from 'app/modules/services/ministro.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-indicacao-impedimentos',
  templateUrl: './form-indicacao-impedimentos.component.html',
  styleUrls: ['./form-indicacao-impedimentos.component.scss']
})
export class FormIndicacaoImpedimentosComponent implements OnInit {

  formIndicacao: FormGroup;
  ministros: Ministro[] = [];

  constructor(
    private _ministroService: MinistroService,
    private _fb: FormBuilder,
  ) { 
    this._construirFormulario(); // Garante que uma instância de FormGroup vazia seja criada durante a criação do componente

    this._ministroService.listarMinistros().subscribe({
      next: (ministros) => {
        this.ministros = ministros;
        this._construirFormulario();
      }
    });
  }

  ngOnInit(): void {
    
  }

  public salvar(): void {
    if (this.formIndicacao.valid) {
      console.log(this.formIndicacao.value)
    }
  }

  /**
   * @private Método privado
   * @description Cria uma instância de FormGroup cujo os atributos do objeto 
   *              são criados de forma dinâmica, neste caso, o formControlName
   *              será o id de cada ministro.
   * @author Douglas da Silva Monteles
   */
  private _construirFormulario(): void {
    let formMinistros = {};

    this.ministros.forEach(({id}) => {
      formMinistros[`${id}`] = [null, Validators.required];
    });

    this.formIndicacao = this._fb.group(formMinistros);
  }

}
