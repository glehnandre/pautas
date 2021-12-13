import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public registrarMinistroComoSuspeitoOuImpedido(event: EventEmitter<MatRadioChange>): void {
    const { id, situacao } = event['value'];

    if (situacao === 'impedido') {
      this.resultado.ministrosImpedidos.add(id);
      this.resultado.ministrosSuspeitos.delete(id);
    } else {
      this.resultado.ministrosSuspeitos.add(id);
      this.resultado.ministrosImpedidos.delete(id);
    }
  }

  public registrar(): void {
    if (this.formIndicacao.valid) {
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
