import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessoCheckboxProps } from './tabela/linha/linha.component';

interface Processo {
  idsProcessos: Array<number>;
  idsTags: Array<{id: number}>;
};

@Component({
  selector: 'app-acervo',
  templateUrl: './acervo.component.html',
  styleUrls: ['./acervo.component.scss']
})

export class AcervoComponent implements OnInit {
  @Output() SelectAllLines:any;

  processo: Processo = {
    idsTags: [],
    idsProcessos: [],
  };

  processoSelecionados: ProcessoCheckboxProps[] = [];

  constructor(
    private _httpClient: HttpClient,
  ) {}

  ngOnInit(): void {
  }

  reciverFeedback(CheckboxStatus) {
    this.SelectAllLines = CheckboxStatus;
  }

  obterIdsDasTagsSelecionadas(idsTags: Array<{id: number}>) {
    if (idsTags) {
      this.processo.idsTags = idsTags;
    }

    // Requisição PUT
    this.processo.idsProcessos.forEach(id => {
      this.atualizarTagsDoProcesso(id).subscribe({
        next: (data) => {
          console.log(data);
        }
      });
    });
  }

  obterProcessosSelecionados(data: Array<ProcessoCheckboxProps>): void {
    data.forEach(({processoId}) => {
      this.processo.idsProcessos.push(processoId)
    });
    this.processoSelecionados = data;
    this.processos();
  }

  processos(): ProcessoCheckboxProps[]{
    return this.processoSelecionados;
  }

  atualizarTagsDoProcesso(id: number): Observable<any> {
    return this._httpClient.put<any>(`processos/${id}/tag`, {
      idsTags: this.processo.idsTags,
    }).pipe(
        catchError(error => {
          console.log(error);
          return EMPTY;
        }),
    );
}
}
