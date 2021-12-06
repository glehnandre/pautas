import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
  ) { }

  @Input() secretario: { id: number; nome: string };
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

    if(this.secretario)
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

  teste(): void {}
}
