import { Component, OnInit } from '@angular/core';
import { SituacaoDoProcesso } from 'app/modules/acervo/model/enums/situacaoDoProcesso.enum';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { SessaoDeJulgamento } from 'app/modules/acervo/model/interfaces/sessaoDeJulgamento.interface';
import { JulgamentoService, SessaoJulgamento } from 'app/modules/services/julgamento.service';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { DatePipe } from '@angular/common';

registerLocaleData(localePT);

@Component({
  selector: 'app-sessao-extraordinaria',
  templateUrl: './sessao-extraordinaria.component.html',
  styleUrls: ['./sessao-extraordinaria.component.scss']
})
export class SessaoExtraordinariaComponent implements OnInit {

  tags: string[] = ['Virtual', 'Segunda Turma', 'Inicio e fim no dia 21/04/2021'];
  observacoes: string;
  processos: Processo[] = [];
  sessao: SessaoDeJulgamento;
  objeto: SessaoJulgamento;
  solicitante: string;
  colegiado: string;
  data_inicio: string;
  data_fim: string;
  texto: string;


  constructor(
    private _julgamentoService: JulgamentoService,
  ) {}

  ngOnInit(): void {
    this._julgamentoService.listarSessoesDeJulgamento(1000, 2021).subscribe({
      next: (julg) => {
        this.sessao = julg.sessao;
        const { numero, ano, data_inicio, data_fim } = this.sessao;
        this._julgamentoService.listarProcessosPautadosNasSessoes(numero, ano, SituacaoDoProcesso.Pautado, data_inicio, data_fim).subscribe({
          next: (processos) => {
            this.processos = processos;
          }
        });
      }
    });

    this._julgamentoService.listarSessoesDeJulgamento(1000, 2021).subscribe(data=>{
      this.observacoes = data.observacao;
      this.solicitante = data.ministro.nome;
      this.colegiado = data.sessao.colegiado;
      this.setTexto(data.sessao.data_inicio, data.sessao.data_fim);
    });
  }

  setTexto(inicio: string, fim: string){
    const datepipe: DatePipe = new DatePipe('pt-BR')
    this.data_inicio = datepipe.transform(inicio, 'dd/MM/YYYY, EEEE');
    this.data_fim = datepipe.transform(fim, 'dd/MM/YYYY, EEEE');
    if(inicio==fim){
      this.texto = `${this.solicitante} solicitou a criação de uma Sessão de Julgamento Extraordinária para ${this.colegiado} no dia ${this.data_inicio}.`
    }
    else{
      this.texto = `${this.solicitante} solicitou a criação de uma Sessão de Julgamento Extraordinária para ${this.colegiado} no dia ${this.data_inicio} até o dia ${this.data_fim}.`
    }
  }

  aprovarSessao(){
    let ano: number = 2021;
    let numero: number = 1000;

    this._julgamentoService.aprovarSessaoDeJulgamento(numero, ano).subscribe(data=>{
      console.log(data);
    })
  }

  recusarSessao(){
    let ano: number = 2021;
    let numero: number = 1000;

    this._julgamentoService.rejeitarSessaoDeJulgamento(numero, ano).subscribe(data=>{
      console.log(data);
    })
  }

}
