import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SituacaoDoProcesso } from 'app/modules/acervo/model/enums/situacaoDoProcesso.enum';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';
import { JulgamentoService } from 'app/modules/services/julgamento.service';
import { HttpClient } from '@angular/common/http';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';

@Component({
  selector: 'app-sessao-extraordinaria',
  templateUrl: './sessao-extraordinaria.component.html',
  styleUrls: ['./sessao-extraordinaria.component.scss']
})
export class SessaoExtraordinariaComponent implements OnInit {

  formJulgamento: FormGroup;
  tags: string[] = ['Virtual', 'Segunda Turma', 'Inicio e fim no dia 21/04/2021'];
  processos: Processo[] = [];
  sessao: SessaoJulgamento;
  observacao = '';
  ministro: Ministro;

  constructor(
    private _julgamentoService: JulgamentoService,
    private _httpClient: HttpClient,
  ) {}

  ngOnInit(): void {
    this._julgamentoService.listarSessoesDeJulgamento(1000, 2021).subscribe({
      next: (sessao) => {
        this.sessao = sessao;
        this.observacao = sessao['observacao'];
        this.ministro = sessao['ministro'];
        
        const { numero, ano, data_inicio, data_fim } = this.sessao;
        
        this._julgamentoService.listarProcessosPautadosNasSessoes(numero, ano, SituacaoDoProcesso.Pautado, data_inicio, data_fim).subscribe({
          next: (processos) => {
            this.processos = processos;
          }
        });
      }
    });
  }

  /*teste(){
    let ano: number = 2021;
    console.log(this._httpClient.get(`/sessoes-de-julgamento/${ano}`));
  }*/

}
