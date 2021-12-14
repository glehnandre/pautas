import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { MinistroService } from 'app/modules/services/ministro.service';
import { ProcessoService } from 'app/modules/services/processo.service';

@Component({
  selector: 'app-form-indicacao-impedimentos',
  templateUrl: './form-indicacao-impedimentos.component.html',
  styleUrls: ['./form-indicacao-impedimentos.component.scss']
})
export class FormIndicacaoImpedimentosComponent implements OnInit {

  formIndicacao: FormGroup;
  ministros: Ministro[] = [];
  resultado: {
    ministrosImpedidos: Set<number>;
    ministrosSuspeitos: Set<number>;
  } = {
    ministrosImpedidos: new Set(),
    ministrosSuspeitos: new Set(),
  };

  constructor(
    private _ministroService: MinistroService,
    private _processoService: ProcessoService,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<FormIndicacaoImpedimentosComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: { idProcesso: number }, 
  ) { 
    this._construirFormulario(); // Garante que uma instância de FormGroup vazia seja criada durante a criação do componente

    this._ministroService.listarMinistros().subscribe({
      next: (ministros) => {
        this.ministros = ministros;
        this._construirFormulario();
      }
    });
  }

  ngOnInit(): void {}

  /**
   * @public Método público
   * @param event Evento que contém os dados de value do checkbox
   * @description Realiza o registro do ministro como suspeito ou impedido
   * @author Douglas da Silva Monteles
   */
  public registrarMinistroComoSuspeitoOuImpedido(event: MatCheckboxChange): void {
    const { id, situacao } = event.source.value as any;
    const isChecked = event.checked;

    if (isChecked) {
      if (situacao === 'suspeito') {
        this.resultado.ministrosSuspeitos.add(id);
        this.resultado.ministrosImpedidos.delete(id);
      } else {
        this.resultado.ministrosImpedidos.add(id);
        this.resultado.ministrosSuspeitos.delete(id);
      }
    } else {
      if (situacao === 'suspeito') {
        this.resultado.ministrosSuspeitos.delete(id);
      } else {
        this.resultado.ministrosImpedidos.delete(id);
      }
    }

    console.log(this.resultado)
  }

  /**
   * @public Método público
   * @param checkbox Template variable que faz referência ao mat-checkbox
   * @description A variável de template referencia a instancia do componente,
   *              podendo realizar modificações em seu estado. Neste caso, ele
   *              vai alterar o estado do mat-checkbox false.
   * @author Douglas da Silva Monteles
   */
  public gerenciarSelecao(checkbox: MatCheckboxChange): void {
    checkbox.checked = false;
  }

  /**
   * @public Método público
   * @description Realiza a chamada para a API para salvar os ids dos ministros.
   * @author Douglas da Silva Monteles
   */
  public registrar(): void {
    const obj = {
      ministros_impedidos: [...this.resultado.ministrosImpedidos],
      ministros_suspeitos: [...this.resultado.ministrosSuspeitos],
    };

    this._processoService.salvarImpedimentos(this._data.idProcesso, obj).subscribe({
      next: () => {
        this._dialogRef.close('ok');
      },
    });
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
      formMinistros[`${id}`] = [null, []];
    });

    this.formIndicacao = this._fb.group(formMinistros);
  }

}
