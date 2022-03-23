import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaService } from 'app/modules/services/alerta.service';
import { UsuariosService } from 'app/modules/services/usuario.service';
import { Secretario } from 'app/shared/model/interfaces/secretario.interface';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'digital-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _usuarioService: UsuariosService,
    private _alertaService: AlertaService,
  ) { }

  @Input() secretario: Secretario;
  @Input() cabecalho: string;
  @Input() outrosPresentes: string;

  @Output() statusForm = new EventEmitter<any>();

  formFinalizarSessao: FormGroup;

  secretarios$: Observable<Secretario[]>;

  errorMessage: string;

  /**
   * On init
   */
  ngOnInit(): void {
    this.formFinalizarSessao = this._fb.group({
      secretario: ['', Validators.required],
      outrosPresentes: [''],
      cabecalho: [''],
    });

    this.secretarios$ = this._usuarioService.getTodosUsuarios().pipe(
      catchError(error => {
        console.log(error);
        this.errorMessage =  error.message;
        this._alertaService.exibirAlerta("Error")
        return EMPTY;
      })
    );
    this.emitirForm();
  }

  /**
   * Verifica se o secretário da sessão foi indicado
   */
  getErrorMessage() {
    return this.formFinalizarSessao.controls
      .secretario.hasError('required') ? 'Informe o secretário ou secretária da sessão' : '';
  }

  /**
   * Emite o que foi preenchido nos campos
   */
  emitirForm(): void {
    this.statusForm.emit(this.formFinalizarSessao.value);
  }
}
