import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Processo } from 'app/modules/acervo/tabela/tabela.component';
import { Tag } from '../agrupar-emlista.component';

@Component({
  selector: 'app-gerenciar-marcadores',
  templateUrl: './gerenciar-marcadores.component.html',
  styleUrls: ['./gerenciar-marcadores.component.scss']
})
export class GerenciarMarcadoresComponent implements OnInit {
  tagForm: FormGroup;
  processoForm: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  processoCtrl = new FormControl();
  processosFiltrados: Observable<Processo[]>;
  processosSelecionados: Processo[] = [];
  processosRemovidos: Processo[] = [];
  todosOsProcessos: Processo[] = [];

  @ViewChild('processoInput') processoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  tags: Tag[] = [];
  tagEscolhida: Tag = {
    id: 0,
    descricao: '',
    checked: false,
    publica: false,
  };

  constructor(
    private _httpClient: HttpClient,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<GerenciarMarcadoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.tagForm = this._fb.group({
      id: [0, [Validators.required]],
      descricao: ['', [Validators.required]],
      publica: [false, [Validators.required]],
      checked: [false,[]],
    });

    this.processoForm = this._fb.group({
      processos: [[], [Validators.required]]
    });

    this.buscarProcessos();
  }

  ngOnInit(): void {
    this._listarTags().subscribe({
      next: (data) => {
        this.tagEscolhida = data[0];
        this.tagForm.setValue(this.tagEscolhida);
        this.tags = data;

        this.buscarProcessosDaLista();
      }
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').toLocaleLowerCase();
    
    const processo = this.todosOsProcessos
      .find(({classe, numero}) => {
        const classeNumero = `${classe} ${numero}`.toLocaleLowerCase();
        return classeNumero === value;
      });
    
    if (processo) {
      this.processosSelecionados.push(processo);
      this.processoForm.setValue({processos: this.processosSelecionados});
    }

    // Clear the input value
    event.chipInput!.clear();

    this.processoCtrl.setValue(null);
  }

  remove(processo: Processo): void {
    const index = this.processosSelecionados.indexOf(processo);

    if (index >= 0) {
      this.processosSelecionados.splice(index, 1);
      this.processoForm.setValue({processos: this.processosSelecionados});
      
      if (processo.lista.find(lista => lista.id === this.tagEscolhida.id)) {
        // DELETE via API
        this._deletarProcessoDaTag(processo.id).subscribe({
          next: (data) => {
            console.log(data);
          }
        });
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.processosSelecionados.push(event.option.value);
    this.processoForm.setValue({processos: this.processosSelecionados});
    this.processoInput.nativeElement.value = null;
    this.processoCtrl.setValue(null);
  }

  private _filter(value: Processo | string): Processo[] {
    const isProcesso = (<Processo>value).numero !== undefined;
    const filterValue = (isProcesso) ? ((<Processo>value).classe + ' ' + (<Processo>value).numero).toString().toLocaleLowerCase() : value.toString().toLocaleLowerCase();

    return this.todosOsProcessos
      .filter(({classe, numero}) => {
        const classeNumero = `${classe} ${numero}`;
        return classeNumero.toString().toLocaleLowerCase().includes(filterValue);
      });
  }

  private _listarTags(): Observable<Tag[]> {
    return this._httpClient.get<Tag[]>('tags').pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public buscarProcessosDaLista(): void {
    this._carregarProcessosDaLista().subscribe({
      next: (data) => {
        this.processosSelecionados = data;
        this.tagForm.setValue(this.tagEscolhida);
        this.processoForm.setValue({processos: this.processosSelecionados});
      }
    });
  }

  private _carregarProcessosDaLista(): Observable<Processo[]> {
    return this._httpClient.get<Processo[]>(`tags/${this.tagEscolhida.id}/processos`).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    );
  }

  public buscarProcessos(): void {
    this._carregarProcessos().subscribe({
      next: (data) => {
        this.todosOsProcessos = data;
        this.processosFiltrados = this.processoCtrl.valueChanges.pipe(
          startWith(''),
          map((processo: Processo | null) => 
            processo ? this._filter(processo) : this.todosOsProcessos.slice()));
      }
    });
  }

  private _carregarProcessos(): Observable<Processo[]> {
    return this._httpClient.get<Processo[]>('processos', {}).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    );
  }

  public atualizar(): void {
    console.log(this.processoCtrl.value)
    // PUT /tags/:id
    this._atualizaTag().subscribe({
      next: (tag) => {
        // PUT /tag/:id/processos
        this.processosSelecionados.forEach(processo => {
          this._atualizaProcessos(processo.id, tag).subscribe({
            next: (data) => {
              console.log('processos atualizados');
              console.log(data);
            }
          });
        });
      }
    });
  }

  private _atualizaTag(): Observable<Tag> {
    return this._httpClient.put<Tag>(`tags/${this.tagEscolhida.id}`, this.tagForm.value)
      .pipe(
        catchError(error => {
          console.log(error);
          return EMPTY;
        }),  
    );
  }

  private _atualizaProcessos(id: number, tag: Tag): Observable<Processo[]> {
    const idsTags = [{id: tag.id}];
    return this._httpClient.put<Processo[]>(`processos/${id}/tag`, {idsTags}).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    );
  }

  private _deletarProcessoDaTag(processoId: number): Observable<Processo> {
    return this._httpClient.delete<Processo>(`tags/${this.tagEscolhida.id}/processos/${processoId}`)
      .pipe(
        catchError(error => {
          console.log(error);
          return EMPTY;
        }),
      );
  }

}
