import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Secretario } from 'app/modules/acervo/model/interfaces/secretario.interface';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewChecked {

  constructor(
    private _fb: FormBuilder,
  ) { }

  @Input() secretario: Secretario;
  @Output() statusForm = new EventEmitter<any>();

  formFinalizarSessao: FormGroup;

  options: string[] = [];
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.formFinalizarSessao = this._fb.group({
      secretario: ['', Validators.required],
      outrosPresentes: [''],
      cabecalho: [''],
    });

    this.filteredOptions = this.formFinalizarSessao.controls
      .secretario.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
  }

  ngAfterViewChecked(): void {
    if(this.options.length==0 && this.secretario)
      this.options.push(this.secretario.nome);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getErrorMessage() {
    return this.formFinalizarSessao.controls
      .secretario.hasError('required') ? 'Informe o secretário ou secretária da sessão' : '';
  }

  emitirForm(): void {
    this.statusForm.emit(this.formFinalizarSessao.value);
  }
}
