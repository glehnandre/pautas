import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, Output, SimpleChange, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ProcessoService } from 'app/modules/services/processo.service';
import { Processo } from '../model/interfaces/processo.interface';
import { Paginacao } from './paginacao/paginacao.component';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit, OnChanges {
  @Input() allSelected: any;
  @Output() selectAll: any;
  @Output() tagSelecionada = new EventEmitter();
  @Output() statusSelecionado = new EventEmitter();
  @Output() data: {
    checked: boolean;
    nome: string;
    descricao: string;
    capitulo: {
      titulo: string;
      preliminares: [{
        subtitulo: string;
        texto: string;
      }];
    };
  };

  processosSelecionados: Processo[] = [];
  processos: Processo[];

  documentos: {
    nomes: string[];
    links: string[];
  }[] = [];

  constructor(
    private _processoService: ProcessoService,
  ) {}

  ngOnInit(): void {
    this._processoService.isCarregarProcesso().subscribe(() => {
      this.processos = [];
      this._buscarProcessos();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Extract changes to the input property by its name
    const change: SimpleChange = changes['allSelected'];
    this.selectAll = changes['allSelected'].currentValue?.checked;
    if (this.selectAll) {
      this._processoService.setProcessosSelecionados(this.processos);
      this.processosSelecionados = [...this.processos];
    } else {
      this.processosSelecionados = [];
      this._processoService.setProcessosSelecionados(this.processosSelecionados);
    }
  }


  check(): void {
    //this.selectAll = this.allSelected
  }

  filtrarPorTags(tag): void {
    this.tagSelecionada.emit(tag);
  }

  filtrarPorStatus(status): void {
    this.statusSelecionado.emit(status);
  }

  trataEventoDeChecked(data: Processo): void {
    if (data.checked) {
      const index = this.processosSelecionados.findIndex(({id}) => id === data.id);
      if (index !== -1) {
        // id do processo já está na coleção
        this.processosSelecionados.splice(index, 1);
      } else {
        // id não está na coleção
        this.processosSelecionados.push(data);
      }
    } else {
      const index = this.processosSelecionados.findIndex(({id}) => id === data.id);
      this.processosSelecionados.splice(index, 1);
    }

    this._processoService.setProcessosSelecionados(this.processosSelecionados);
  }

  dadosDaPaginacao(dados: Paginacao): void {
    let params = new HttpParams();
    params = params.set('itensPorPagina', dados.itensPorPagina);
    params = params.set('numeroDaPagina', dados.numeroDaPagina);
    params = params.set('offset', dados.offset);

    this._buscarProcessos(params);
  }

  private _buscarProcessos(params?: HttpParams): void {
    this._processoService.listarProcessos().subscribe({
      next: (data) => {
        this.processos = data.map((processo) => {
            processo.checked = false;

            return processo;
        });
      }
    });
  }
}
