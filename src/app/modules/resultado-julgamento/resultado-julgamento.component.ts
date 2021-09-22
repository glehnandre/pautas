import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { Voto } from '../acervo/model/interfaces/voto.interface';
import { ProcessoService } from '../services/processo.service';
import { ResultadoJulgamentoService } from '../services/resultado-julgamento.service';

@Component({
  selector: 'app-resultado-julgamento',
  templateUrl: './resultado-julgamento.component.html',
  styleUrls: ['./resultado-julgamento.component.scss']
})
export class ResultadoJulgamentoComponent implements OnInit {

  dados: any;

  processosPorTags: Processo[] = [];
  processosSelecioandos: Processo[] = [];
  voto: Voto = {} as Voto;

  constructor(
    private _resultadoJulgamento: ResultadoJulgamentoService,
    private _processoService: ProcessoService,
  ) { 
    
  }

  ngOnInit(): void {
    this._resultadoJulgamento.listarDecisoes().subscribe({
      next: (data) => {
        this.dados = data;
        console.log(data)

        const tags = this.dados.processo.lista.map(tag => tag.id);

        this._processoService.listarProcessos(new HttpParams().set('tag', tags)).subscribe({
          next: (processos) => {
            setTimeout(() => {
              this.processosPorTags = processos;
            }, 3000)
          }
        });

        const { classe, numero, abreviacao } = this.dados.processo;

        this._processoService.obterVotosDoProcesso(`${classe}${numero}-${abreviacao}`).subscribe({
          next: (voto) => {
            this.voto = voto;
          }
        });
      }
    });

  }

  public aplicarAsMesmasDecisoes(processo: Processo) {
    const index = this.processosSelecioandos.findIndex(p => p.id === processo.id);

    if (index !== -1) {
      this.processosSelecioandos.splice(index, 1);
    } else {
      this.processosSelecioandos.push(processo);
    }

    console.log(this.processosSelecioandos)
  }
}
