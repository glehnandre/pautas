import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertaService } from 'app/modules/services/alerta.service';
import { ProcessoService } from 'app/modules/services/processo.service';
import { Alerta } from 'app/shared/alerta/alerta.component';
import { DialogoConfirmacaoComponent } from 'app/shared/dialogo-confirmacao/dialogo-confirmacao.component';
import { Suspensao } from 'app/shared/model/interfaces/suspensao.interface';

interface Parametros {
  numero: number;
  ano: number;
  processo: number;
  sessao: number;
}

@Component({
  selector: 'app-form-suspensao',
  templateUrl: './form-suspensao.component.html',
  styleUrls: ['./form-suspensao.component.scss']
})
export class FormSuspensaoComponent implements OnInit, OnChanges {

  formSuspensao: FormGroup;
  alerta: Alerta = null;
  
  @Input() parametros: Parametros;
  @Input() suspensao: Suspensao;

  @Output() closeDrawerEmit = new EventEmitter();

  readonly ALERTA_FORM_SUSPENSAO = 'alerta-form-suspensao';

  constructor(
    private _fb: FormBuilder,
    private _processoService: ProcessoService,
    private _alertaService: AlertaService,
    private _dialog: MatDialog,
    public cd: ChangeDetectorRef,
  ) { 
    
  }

  ngOnInit(): void {
    this._inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._inicializarFormulario();
  }

  public excluirSuspensao(): void {
    const dialogRef = this._dialog.open(DialogoConfirmacaoComponent, {
      data: {
        titulo: 'EXCLUSÃO DE SUSPENSÃO',
        mensagem: `Confirma a exclusão da Suspensão: ${this.suspensao.texto}?`
      },
    });

    dialogRef.afterClosed().subscribe(confirmacao => {
      if (confirmacao) {
        const {
          numero,
          ano,
          processo,
        } = this.parametros;

        this._processoService.excluirSuspensao(
          numero, 
          ano, 
          processo, 
          this.suspensao.id
        ).subscribe({
          next: () => {
            this.alerta = {
              nome: this.ALERTA_FORM_SUSPENSAO,
              titulo: 'Sucesso!',
              mensagem: 'Suspensão excluída com sucesso.',
              tipo: 'success',
            };

            this.closeDrawerEmit.emit(this.alerta);
          },
        });
      }
    });
  }

  public salvarSuspensao(): void {
    if (this.formSuspensao.valid) {
      const {
        ano,
        numero,
        processo,
      } = this.parametros;

      const suspensao: Suspensao = {
        ...this.formSuspensao.value,
        id: (this.suspensao && this.suspensao.id) ? this.suspensao.id : null,
      };

      const isSuspensaoJaExistente = (this.suspensao && this.suspensao?.texto?.length > 0);
  
      this._processoService.salvarOuAtualizarSuspensao( 
        numero, 
        ano,
        processo, 
        suspensao,
      ).subscribe({
        next: () => {
          this.alerta = {
            nome: this.ALERTA_FORM_SUSPENSAO,
            titulo: 'Sucesso!',
            mensagem: `Suspensão ${(isSuspensaoJaExistente) ? 'atualizada' : 'cadastrada'} com sucesso.`,
            tipo: 'success',
          };

          this.formSuspensao.reset();
          this.closeDrawerEmit.emit(this.alerta);
        },
      });
    }
  }

  private _inicializarFormulario(): void {
    if (this.suspensao && this.suspensao.id > 0 && this.parametros) {
      this.formSuspensao = this._fb.group({
        id: [this.suspensao.id],
        data: [this.suspensao.data],
        texto: [this.suspensao.texto],
        sessao: [this.suspensao.sessao],
        processo: [this.suspensao.processo],
      });
    } else {
      this.formSuspensao = this._fb.group({
        id: [null],
        data: ['', Validators.required],
        texto: ['', Validators.required],
        sessao: [this.parametros.numero],
        processo: [this.parametros.processo],
      });
    }

    this.formSuspensao.valueChanges.subscribe(() => this.cd.detectChanges());
  }

  private _exibirAlerta(titulo: string, mensagem: string, tipo: 'success' | 'error'): void {
    this.alerta = {
      nome: this.ALERTA_FORM_SUSPENSAO,
      titulo,
      mensagem,
      tipo,
    };

    this._alertaService.exibirAlerta(this.ALERTA_FORM_SUSPENSAO);
  }

}
