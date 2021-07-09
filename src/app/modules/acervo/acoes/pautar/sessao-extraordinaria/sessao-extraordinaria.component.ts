import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Processo, SituacaoDoProcesso } from 'app/modules/acervo/tabela/tabela.component';
import { EMPTY, Observable } from 'rxjs';
import { startWith, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-sessao-extraordinaria',
  templateUrl: './sessao-extraordinaria.component.html',
  styleUrls: ['./sessao-extraordinaria.component.scss']
})
export class SessaoExtraordinariaComponent implements OnInit {

  sessaoExtraordinariaForm: FormGroup;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  processoCtrl = new FormControl();
  processosFiltrados: Observable<Processo[]>;
  processosSelecionados: Processo[] = [];
  processos: Processo[] = [];

  @ViewChild('processoInput') processoInput: ElementRef<HTMLInputElement>;

  constructor(
    private _fb: FormBuilder,
    private _httpClient: HttpClient,
  ) {
    this.sessaoExtraordinariaForm = this._fb.group({
      data_inicio: ['', [Validators.required]],
      data_fim: ['', [Validators.required]],
      assunto: ['', [Validators.required]],
      colegiado: ['', [Validators.required]],
      pautas: [this.processosSelecionados],
    });

    this.recuperarProcessos();    
  }

  ngOnInit() {}

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').toLocaleLowerCase();
    
    const processo = this.processos
      .find(({classe, numero}) => {
        const classeNumero = `${classe} ${numero}`.toLocaleLowerCase();
        return classeNumero === value;
      });
    
    if (processo) {
      this.processosSelecionados.push(processo);
    }

    event.chipInput!.clear();

    this.processoCtrl.setValue(null);
  }

  public remove(processo: Processo): void {
    const index = this.processosSelecionados.indexOf(processo);

    if (index >= 0) {
      this.processosSelecionados.splice(index, 1);
    }
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    this.processosSelecionados.push(event.option.value);
    this.processoInput.nativeElement.value = '';
    this.processoCtrl.setValue(null);
  }

  public solicitarSessaoExtraordinaria(): void {
    if (this.sessaoExtraordinariaForm.valid) {
      console.log(this.sessaoExtraordinariaForm.value);
      this._httpClient.post('pautas', this.sessaoExtraordinariaForm.value)
        .subscribe({
          next: (data) => {
            console.log(data);
          }
        })
    }
  }
  
  private _filter(value: Processo | string): Processo[] {
    const isProcesso = (<Processo>value).numero !== undefined;
    const filterValue = (isProcesso) ? ((<Processo>value).classe + ' ' + (<Processo>value).numero).toString().toLocaleLowerCase() : value.toString().toLocaleLowerCase();
    
    return this.processos
      .filter(({classe, numero}) => {
        const classeNumero = `${classe} ${numero}`;
        return classeNumero.toString().toLocaleLowerCase().includes(filterValue);
      });
  }

  public recuperarProcessos() {
    this._obterProcessos().subscribe({
      next: (data) => {
        this.processos = data;

        this.processosFiltrados = this.processoCtrl.valueChanges.pipe(
          startWith(''),
          map((processo: Processo | null) => 
            processo ? this._filter(processo) : this.processos.slice()));
      }
    });
  }

  private _obterProcessos(): Observable<Processo[]> {
    let params = new HttpParams();
    params = params.set('situacao-processo', SituacaoDoProcesso['Apto a Julgar']);

    return this._httpClient.get<Processo[]>('processos', { params }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    )
  }

}
