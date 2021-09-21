import { Component, OnInit } from '@angular/core';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';
import { JulgamentoService } from 'app/modules/services/julgamento.service';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { DatePipe } from '@angular/common';
import { FuseAlertService } from '@fuse/components/alert';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
registerLocaleData(localePT);

@Component({
  selector: 'app-sessao-extraordinaria',
  templateUrl: './sessao-extraordinaria.component.html',
  styleUrls: ['./sessao-extraordinaria.component.scss']
})
export class SessaoExtraordinariaComponent implements OnInit {

  tags: string[] = ['Virtual', 'Segunda Turma', 'Inicio e fim no dia 21/04/2021'];
  observacao: string;
  sessao: SessaoJulgamento;
  solicitante: Ministro;
  colegiado: string;
  data_inicio: string;
  data_fim: string;
  texto: string;
  nome_solicitante: string;
  resposta: string;

  sessoes: SessaoJulgamento[] = [];

  constructor(
    private _julgamentoService: JulgamentoService,
    private _fuseAlertService: FuseAlertService,
  ) {}

  ngOnInit(): void {
    this._julgamentoService.listarSessoesDeJulgamento(1000, 2021).subscribe({
      next: (sessao) => {
        this.sessao = sessao;
        this.observacao = sessao['observacao'];
        this.solicitante = sessao['ministro'];
        this.colegiado = sessao['colegiado'];
        this.nome_solicitante = this.solicitante.nome;

        const { data_inicio, data_fim } = this.sessao;

        this.setTexto(data_inicio, data_fim);
      }
    });

    this._julgamentoService.listarTodasAsSessoesDeJulgamento().subscribe(data=>{
      this.sessoes = data;
    })


  }

  setTexto(inicio: string, fim: string){
    const datepipe: DatePipe = new DatePipe('pt-BR')
    this.data_inicio = datepipe.transform(inicio, 'dd/MM/YYYY, EEEE');
    this.data_fim = datepipe.transform(fim, 'dd/MM/YYYY, EEEE');
    if(inicio==fim){
      this.texto = `${this.solicitante.nome} solicitou a criação de uma Sessão de Julgamento Extraordinária para ${this.colegiado} no dia ${this.data_inicio}.`
    }
    else{
      this.texto = `${this.solicitante.nome} solicitou a criação de uma Sessão de Julgamento Extraordinária para ${this.colegiado} no dia ${this.data_inicio} até o dia ${this.data_fim}.`
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

    this._julgamentoService.aprovarSessaoDeJulgamento(numero, ano, this.resposta).subscribe(data=>{
      console.log(data,this.resposta);
    })
  }

  recusarSessao(){
    let ano: number = 2021;
    let numero: number = 1000;

    this._julgamentoService.rejeitarSessaoDeJulgamento(numero, ano, this.resposta).subscribe(data=>{
      console.log({resposta:this.resposta, data});
    })
  }
}
