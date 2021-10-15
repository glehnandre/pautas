import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessoService } from '../services/processo.service';
import { Processo } from './model/interfaces/processo.interface';

interface ProcessosTags {
  idsProcessos: Array<number>;
  idsTags: Array<{ id: number }>;
};

@Component({
  selector: 'app-acervo',
  templateUrl: './acervo.component.html',
  styleUrls: ['./acervo.component.scss']
})

export class AcervoComponent implements OnInit {
  @Output() selectAllLines: any;
  @Output() tagSelecionada = new EventEmitter();
  @Output() statusSelecionado = new EventEmitter();

  processo: ProcessosTags = {
    idsTags: [],
    idsProcessos: [],
  };

  processoSelecionados: Processo[] = [];

  eventsSubject: Subject<any> = new Subject<any>();

  constructor(
    private _httpClient: HttpClient,
    private _processoService: ProcessoService,
  ) { }


  ngOnInit(): void {
    this._processoService.obterProcessosSelecionados().subscribe((processos) => {
      this.obterProcessosSelecionados(processos);
    });
  }

  filtrarPorTags(data): void {
    this.eventsSubject.next({data});
  }

  filtrarPorStatus(data): void {
    this.eventsSubject.next({data});
  }


  reciverFeedback(checkboxStatus): void {
    this.selectAllLines = checkboxStatus;
  }

  obterIdsDasTagsSelecionadas(idsTags: Array<{ id: number }>): void {
    if (idsTags) {
      this.processo.idsTags = idsTags;
    }

    // Requisição PUT
    this.processo.idsProcessos.forEach((id) => {
      this.atualizarTagsDoProcesso(id).subscribe({
        next: (data) => {
          console.log(data);
        }
      });
    });
  }

  obterProcessosSelecionados(data: Processo[]): void {
    data.forEach(({ id }) => {
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
      catchError((error) => {
        console.log(error);
        return EMPTY;
      }),
    );
  }
}
