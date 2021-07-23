import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Processo } from './tabela/tabela.component';

interface ProcessosTags {
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

  processo: ProcessosTags = {
    idsTags: [],
    idsProcessos: [],
  };

  processoSelecionados: Processo[] = [];

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

  obterProcessosSelecionados(data: Processo[]): void {
    data.forEach(({id}) => {
      this.processo.idsProcessos.push(id);
    });

    this.processoSelecionados = data;
    this.processos();
  }

  processos(): Processo[] {
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
