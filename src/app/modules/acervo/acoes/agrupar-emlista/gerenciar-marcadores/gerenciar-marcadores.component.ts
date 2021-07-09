import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Processo } from 'app/modules/acervo/tabela/tabela.component';
import { Tag } from '../agrupar-emlista.component';

@Component({
  selector: 'app-gerenciar-marcadores',
  templateUrl: './gerenciar-marcadores.component.html',
  styleUrls: ['./gerenciar-marcadores.component.scss']
})
export class GerenciarMarcadoresComponent implements OnInit {
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
    public dialogRef: MatDialogRef<GerenciarMarcadoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.buscarProcessos();
  }

  ngOnInit(): void {
    this._listarTags().subscribe({
      next: (data) => {
        this.tagEscolhida = data[0];
        this.tags = data;

        this.buscarProcessosDaLista();
      }
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Adicionar processo
    if (value) {
      const processoEncontrado = this.todosOsProcessos.find(processo => 
        processo.numero === +value);

      this.processosSelecionados.push(processoEncontrado);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.processoCtrl.setValue(null);
  }

  remove(processo: Processo): void {
    const index = this.processosSelecionados.indexOf(processo);

    if (index >= 0) {
      this.processosSelecionados.splice(index, 1);
      
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
    this.processoInput.nativeElement.value = null;
    this.processoCtrl.setValue(null);
  }

  private _filter(value: Processo): Processo[] {
    const filterValue = value.id;

    return this.todosOsProcessos
      .filter(processo => processo.id === filterValue);
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
    return this._httpClient.put<Tag>(`tags/${this.tagEscolhida.id}`, this.tagEscolhida).pipe(
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
