import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Secretario } from 'app/modules/acervo/model/interfaces/secretario.interface';
import { UsuariosService } from 'app/modules/services/usuario.service';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _usuarioService: UsuariosService,
  ) { }

  @Input() secretario: Secretario;
  @Output() statusForm = new EventEmitter<any>();

  formFinalizarSessao: FormGroup;

  secretarios$: Observable<Secretario[]>;

  /**
   * On init
   */
  ngOnInit(): void {
    this.formFinalizarSessao = this._fb.group({
      secretario: ['', Validators.required],
      outrosPresentes: [''],
      cabecalho: [''],
    });

    this.secretarios$ = this._usuarioService.getTodosUsuarios();
      
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
