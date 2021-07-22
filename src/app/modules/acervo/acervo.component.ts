import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

interface Processo {
  idsProcessos: Array<number>;
  idsTags: Array<{id: number}>;
};

@Component({
  selector: 'app-acervo',
  templateUrl: './acervo.component.html',
  styleUrls: ['./acervo.component.scss']
})

@Injectable()
export class AcervoComponent implements OnInit {
  @Output() SelectAllLines:any;

  processo: Processo = {
    idsTags: [],
    idsProcessos: [],
  };

  private processData = new BehaviorSubject<Processo>(undefined);

  constructor(
    private _httpClient: HttpClient,
  ) {}

  getProcess(): Observable<Processo> {
    return this.processData.asObservable();
  }

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

  obterIdsDosProcessos(data: Array<number>): void {
    this.processo.idsProcessos = data;
    this.idsProcessos();
  }

  idsProcessos(): number[]{
    return this.processo.idsProcessos;
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
