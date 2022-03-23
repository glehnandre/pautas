import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Processo } from 'app/shared/model/interfaces/processo.interface';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessoService } from '../services/processo.service';



interface ProcessosTags {
  idsProcessos: Array<number>;
  idsTags: Array<{ id: number }>;
};

@Component({
  selector: 'digital-acervo',
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
        console.error(error);
        return EMPTY;
      }),
    );
  }
}
