import { Component, OnInit } from '@angular/core';
import { SituacaoDoProcesso } from 'app/modules/acervo/model/enums/situacaoDoProcesso.enum';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { SessaoDeJulgamento } from 'app/modules/acervo/model/interfaces/sessaoDeJulgamento.interface';
import { JulgamentoService } from 'app/modules/services/julgamento.service';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { DatePipe } from '@angular/common';
import { FuseAlertService } from '@fuse/components/alert';

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
  solicitante: string;
  colegiado: string;
  data_inicio: string;
  data_fim: string;
  texto: string;

  sessoes: SessaoDeJulgamento[] = [
    {id: 1, ano: 2021, numero: 1, colegiado: 'Primeira Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z'},
    {id: 2, ano: 2021, numero: 2, colegiado: 'Primeira Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z'},
    {id: 3, ano: 2021, numero: 3, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z'},
    {id: 4, ano: 2021, numero: 4, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z'},
    {id: 5, ano: 2021, numero: 5, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z'},
    {id: 6, ano: 2021, numero: 6, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z'},
    {id: 7, ano: 2021, numero: 7, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z'},
    {id: 8, ano: 2021, numero: 8, colegiado: 'Pleno', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z'},
    {id: 9, ano: 2021, numero: 9, colegiado: 'Pleno', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z'},
    {id: 10, ano: 2021, numero: 10, colegiado: 'Pleno', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z'}
  ];



  constructor(
    private _julgamentoService: JulgamentoService,
    private _fuseAlertService: FuseAlertService,
  ) {}

  ngOnInit(): void {
    this._julgamentoService.listarSessoesDeJulgamento(1000, 2021).subscribe({
      next: (julg) => {
        this.sessao = julg.sessao;
        const { numero, ano, data_inicio, data_fim } = this.sessao;
        this._julgamentoService.listarProcessosPautadosNasSessoes(numero, ano, SituacaoDoProcesso.Pautado, data_inicio, data_fim).subscribe({
          next: (processos) => {
            if(processos.length == 0){
              this.mostrarAlerta();
            }
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
      this.teste(data);
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

  mostrarAlerta(){
    this._fuseAlertService.show('alertBox');
  }
  fecharAlerta(){
    this._fuseAlertService.dismiss('alertBox');
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

  teste(data){
    console.log(this.sessao);
    
  }
}
