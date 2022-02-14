import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertaService } from 'app/modules/services/alerta.service';
import { MinistroService } from 'app/modules/services/ministro.service';
import { ProcessoService } from 'app/modules/services/processo.service';
import { Ministro } from 'app/shared/model/interfaces/ministro.interface';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';


@Component({
  selector: 'app-form-indicacao-impedimentos',
  templateUrl: './form-indicacao-impedimentos.component.html',
  styleUrls: ['./form-indicacao-impedimentos.component.scss']
})
export class FormIndicacaoImpedimentosComponent implements OnInit {

  ministros: Ministro[] = [];

  resultado: {
    ministrosImpedidos: Set<number>;
    ministrosSuspeitos: Set<number>;
  } = {
    ministrosImpedidos: new Set(),
    ministrosSuspeitos: new Set(),
  };

  errorMessage: string;

  constructor(
    private _ministroService: MinistroService,
    private _processoService: ProcessoService,
    private _alertaService: AlertaService,
    private _dialogRef: MatDialogRef<FormIndicacaoImpedimentosComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: { sessao: SessaoDeJulgamento, idProcesso: number, resultado: { ministrosImpedidos: Ministro[], ministrosSuspeitos: Ministro[] } }, 
  ) { 
    this._ministroService.listarMinistros().subscribe({
      next: (ministros) => {
        this.ministros = ministros;
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.message
        this._alertaService.exibirAlerta("Error");
      }
    });
  }

  ngOnInit(): void {
    if (this._data.resultado) {
      const { ministrosImpedidos, ministrosSuspeitos } = this._data.resultado;

      ministrosImpedidos.forEach(ministro => {
        const obj = { source: { value: { id: ministro.id, situacao: 'impedido' } }, checked: true };
        this.registrarMinistroComoSuspeitoOuImpedido(obj);
      });

      ministrosSuspeitos.forEach(ministro => {
        const obj = { source: { value: { id: ministro.id, situacao: 'suspeito' } }, checked: true };
        this.registrarMinistroComoSuspeitoOuImpedido(obj);
      });
    }
  }

  /**
   * @public Método público
   * @param id Identificador do ministro
   * @description Método que verifica se o id de um minsitro estar presente na
   *              lista de ids dos ministros impedidos
   * @returns true caso o id do ministro esteja na lista de ids dos ministros 
   *          impedidos, e false caso contrário
   * @author Douglas da Silva Monteles
   */
  public isMinistroImpedidoSelecionado(id: number): boolean {
    return this.resultado.ministrosImpedidos.has(id);
  }

  /**
   * @public Método público
   * @param id Identificador do ministro
   * @description Método que verifica se o id de um minsitro estar presente na
   *              lista de ids dos ministros suspeitos
   * @returns true caso o id do ministro esteja na lista de ids dos ministros 
   *          suspeitos, e false caso contrário
   * @author Douglas da Silva Monteles
   */
  public isMinistroSuspeitoSelecionado(id: number): boolean {
    return this.resultado.ministrosSuspeitos.has(id);
  }

  /**
   * @public Método público
   * @param event Evento que contém os dados de value do checkbox
   * @description Realiza o registro do ministro como suspeito ou impedido
   * @author Douglas da Silva Monteles
   */
  public registrarMinistroComoSuspeitoOuImpedido(event: any): void {
    const { id, situacao } = event.source.value;
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

    this._processoService.salvarImpedimentos(this._data.sessao.numero, this._data.sessao.ano,this._data.idProcesso, obj).subscribe({
      next: () => {
        this._dialogRef.close('ok');
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.message
        this._alertaService.exibirAlerta("Error");
      }
    });
  }

}
