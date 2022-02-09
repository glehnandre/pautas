import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { AlertaService } from 'app/modules/services/alerta.service';
import { JulgamentoService } from 'app/modules/services/julgamento.service';
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
  processosRemovidos: Processo[] = [];
  processos: Processo[] = [];

  errorMessage: string;

  @ViewChild('processoInput') processoInput: ElementRef<HTMLInputElement>;

  constructor(
    private _fb: FormBuilder,
    private _httpClient: HttpClient,
    private _julgamentoSerivce: JulgamentoService,
    private _dialogRef: MatDialogRef<SessaoExtraordinariaComponent>,
    private _alertaService: AlertaService,
  ) {
    this.sessaoExtraordinariaForm = this._fb.group({
      data_inicio: ['', [Validators.required]],
      data_fim: ['', [Validators.required]],
      colegiado: ['', [Validators.required]],
      processos: [[], [Validators.required]],
    });

    this.recuperarProcessos();    
  }

  ngOnInit() {}

  public solicitarSessaoExtraordinaria(): void {
    if (this.sessaoExtraordinariaForm.valid) {
      this._julgamentoSerivce.socilitarSessaoExtraordinaria(this.sessaoExtraordinariaForm.value).subscribe({
        next: (data) => {
          this._alertaService.exibirAlertaDeSucesso();
          this._dialogRef.close();
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = error.message;
          this._alertaService.exibirAlerta("Error");
        }
      });
    }
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').toLocaleLowerCase();
    
    const processo = this.processos
      .find(({classe, numero}) => {
        const classeNumero = `${classe} ${numero}`.toLocaleLowerCase();
        return classeNumero === value;
      });
    
    if (processo) {
      this.processosSelecionados.push(processo);
      this.sessaoExtraordinariaForm.controls.processos.setValue(this.processosSelecionados);
      this._adicionarProcessoAosRemovidos(processo);
    }

    event.chipInput!.clear();

    this.processoCtrl.setValue(null);
  }

  public remove(processo: Processo): void {
    const index = this.processosSelecionados.indexOf(processo);

    if (index >= 0) {
      this.processosSelecionados.splice(index, 1);
      this.sessaoExtraordinariaForm.controls.processos.setValue(this.processosSelecionados);
      this._retirarProcessoDosRemovidos(processo);
    }
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    const processo: Processo = event.option.value;
    this.processosSelecionados.push(processo);
    this.sessaoExtraordinariaForm.controls.processos.setValue(this.processosSelecionados);
    this._adicionarProcessoAosRemovidos(processo);
    this.processoInput.nativeElement.value = '';
    this.processoCtrl.setValue(null);
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
    params = params.set('situacao-processo', 1);

    return this._httpClient.get<Processo[]>('processos', { params }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    )
  }

  private _adicionarProcessoAosRemovidos(processo: Processo) {
    const index = this.processos.findIndex(p => p.id === processo.id);
    if (this.processosRemovidos.findIndex(p => p.id === processo.id) === -1) {
      this.processosRemovidos.push(processo);
      this.processos.splice(index, 1);
      this._recarregaSugestoesDeProcessos();
    }
  }

  private _retirarProcessoDosRemovidos(processo: Processo) {
    const index = this.processosRemovidos.findIndex(p => p.id === processo.id);
    if (index !== -1) {
      const processos = this.processosRemovidos.splice(index, 1);
      this.processos = [...this.processos, ...processos];
      this._recarregaSugestoesDeProcessos();
    }
  }

  private _recarregaSugestoesDeProcessos(): void {
    this.processosFiltrados = this.processoCtrl.valueChanges.pipe(
      startWith(''),
      map((processo: Processo | null) => 
        processo ? this._filter(processo) : this.processos.slice())
      );
  }

}
