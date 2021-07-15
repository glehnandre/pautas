import { Component, Inject, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Processo } from 'app/modules/acervo/tabela/tabela.component';
import { Tag } from '../agrupar-emlista.component';
import { AlertaComponent } from './alerta/alerta.component';

@Component({
  selector: 'app-gerenciar-listas',
  templateUrl: './gerenciar-listas.component.html',
  styleUrls: ['./gerenciar-listas.component.scss']
})
export class GerenciarListasComponent implements OnInit {
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
    private _dialog: MatDialog,
    public dialogRef: MatDialogRef<GerenciarListasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.tagForm = this._fb.group({
      id: [0, [Validators.required]],
      descricao: ['', [Validators.required]],
      publica: [false, [Validators.required]],
      checked: [false,[]],
    });

    this.processoForm = this._fb.group({
      processos: [this.processosSelecionados, [Validators.required]]
    });

    this._listarTags().subscribe({
      next: (data) => {
        this.tagEscolhida = data[0];
        this.tagForm.setValue(this.tagEscolhida);
        this.tags = data;

        this.buscarProcessos();
      }
    });
  }

  ngOnInit(): void {}

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
      this._adicionarProcessoAosRemovidos(processo);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.processoCtrl.setValue(null);
  }

  remove(processo: Processo): void {
    const index = this.processosSelecionados.indexOf(processo);

    if (index >= 0) {
      const processo = this.processosSelecionados.splice(index, 1)[0];
      this.processoForm.setValue({processos: this.processosSelecionados});
      this._retirarProcessoDosRemovidos(processo);
      
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
    const processo: Processo = event.option.value;

    this.processosSelecionados.push(processo);
    this.processoForm.setValue({processos: this.processosSelecionados});
    this._adicionarProcessoAosRemovidos(processo);
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
        this.todosOsProcessos = [...this.todosOsProcessos, ...this.processosRemovidos];
        this.processosRemovidos = [];
        this.processosSelecionados
          .forEach(processo => this._adicionarProcessoAosRemovidos(processo));

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
        this.processosSelecionados
          .forEach(processo => this._adicionarProcessoAosRemovidos(processo));
        this.processosFiltrados = this.processoCtrl.valueChanges.pipe(
          startWith(''),
          map((processo: Processo | null) => {
            return processo ? this._filter(processo) : this.todosOsProcessos.slice();
          })
        );

        this.buscarProcessosDaLista();
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
    if (this.tagForm.valid && this.processoForm.valid) {
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

  private _adicionarProcessoAosRemovidos(processo: Processo) {
    const index = this.todosOsProcessos.findIndex(p => p.id === processo.id);
    const indexProcessoRemovido = this.processosRemovidos.findIndex(p => p.id === processo.id);
    if (indexProcessoRemovido === -1) {
      this.processosRemovidos.push(processo);
      this.todosOsProcessos.splice(index, 1);
      this._recarregaSugestoesDeProcessos();
    } 
  }

  private _retirarProcessoDosRemovidos(processo: Processo) {
    const index = this.processosRemovidos.findIndex(p => p.id === processo.id);
    if (index !== -1) {
      const processos = this.processosRemovidos.splice(index, 1);
      this.todosOsProcessos = [...this.todosOsProcessos, ...processos];
      this._recarregaSugestoesDeProcessos();
    }
  }

  private _recarregaSugestoesDeProcessos(): void {
    this.processosFiltrados = this.processoCtrl.valueChanges.pipe(
      startWith(''),
      map((processo: Processo | null) => 
        processo ? this._filter(processo) : this.todosOsProcessos.slice())
      );
  }

  public excluirLista(): void {
    const dialogRef = this._dialog.open(AlertaComponent, {
      data: {
        titulo: `${this.tagEscolhida.descricao}`,
        mensagem: 'Deseja realmente excluir esta lista?',
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === 'ok') {
        this._httpClient.delete(`tags/${this.tagEscolhida.id}`).subscribe({
          next: () => {
            this.dialogRef.close('ok');
          },
        });
      } else {
        dialogRef.close();
      }
    });
  }

}
