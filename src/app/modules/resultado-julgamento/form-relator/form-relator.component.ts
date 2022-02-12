import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertaService } from 'app/modules/services/alerta.service';
import { MinistroService } from 'app/modules/services/ministro.service';
import { ProcessoService } from 'app/modules/services/processo.service';
import { Ministro } from 'app/shared/model/interfaces/ministro.interface';
import { Processo } from 'app/shared/model/interfaces/processo.interface';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


interface FormRelatorData {
  sessao: SessaoDeJulgamento;
  processo: Processo;
}

@Component({
  selector: 'app-form-relator',
  templateUrl: './form-relator.component.html',
  styleUrls: ['./form-relator.component.scss']
})
export class FormRelatorComponent implements OnInit {

  formRelator: FormGroup;
  ministros$: Observable<Ministro[]>;

  errorMessage: string;

  constructor(
    private _ministroService: MinistroService,
    private _processoService: ProcessoService,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<FormRelatorComponent>,
    private _alertaService: AlertaService,
    @Inject(MAT_DIALOG_DATA) public data: FormRelatorData,
  ) { 
    this.formRelator = this._fb.group({
      id: [data.processo.relator.id, Validators.required],
    });
  }

  ngOnInit(): void {
    this.ministros$ = this._ministroService.listarMinistros().pipe(
      catchError(error => {
        console.log(error);
        this.errorMessage =  error.message;
        this._alertaService.exibirAlerta("Error")
        return EMPTY;
      })
    );
  }

  /**
   * @public Método público
   * @description Realiza a definição do relator do acórdão
   * @author Douglas da Silva Monteles
   */
  public publicar(): void {
    this.salvarRelator();
  }

  public salvarRelator(){
      this._processoService.definirRelatorDoProcesso(this.data.sessao.numero, this.data.sessao.ano, this.data.processo.id, this.formRelator.value.id).subscribe({
        next: (data) => {
          this._dialogRef.close({status:true, mensagem_tratada:"Resultados salvos", mensagem_servidor:data}); 
        },
        error: (data) => {
          if(data.status == 404){
            this._dialogRef.close({status:false, mensagem_tratada:"Processo não encontrado", mensagem_servidor:data.message}); 
          }else{
            this._dialogRef.close({status:false, mensagem_tratada:"Ocorreu um erro inesperado no serviço", mensagem_servidor:data.message}); 
          }
        }
      });
  }
}
