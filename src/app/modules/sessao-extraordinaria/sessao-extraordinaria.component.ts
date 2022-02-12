import { DatePipe, registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseAlertService } from '@fuse/components/alert';
import { SessaoDeJulgamentoService } from 'app/modules/services/sessao-de-julgamento.service';
import { Alerta } from 'app/shared/alerta/alerta.component';
import { Ministro } from 'app/shared/model/interfaces/ministro.interface';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';
import { AlertaService } from '../services/alerta.service';
import { FormRespostaComponent } from './form-resposta/form-resposta.component';


registerLocaleData(localePT);

@Component({
  selector: 'app-sessao-extraordinaria',
  templateUrl: './sessao-extraordinaria.component.html',
  styleUrls: ['./sessao-extraordinaria.component.scss']
})
export class SessaoExtraordinariaComponent implements OnInit {

  tags: string[] = ['Virtual', 'Segunda Turma', 'Inicio e fim no dia 21/04/2021'];
  observacao: string;
  sessao: SessaoDeJulgamento;
  solicitante: Ministro;
  colegiado: string;
  data_inicio: string;
  data_fim: string;
  texto: string;
  nome_solicitante: string;
  resposta: string;

  sessoes: SessaoDeJulgamento[] = [];

  alerta: Alerta = {} as Alerta;

  constructor(
    private _matDialog: MatDialog,
    private _sessaoDejulgamentoService: SessaoDeJulgamentoService,
    private _fuseAlertService: FuseAlertService,
    private _route: ActivatedRoute,
    private _alertaService: AlertaService,
  ) {}

  ngOnInit(): void {
    const { numero, ano } = this._route.snapshot.queryParams;
    this._sessaoDejulgamentoService.listarSessoesDeJulgamento(numero, ano).subscribe({
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

    this._sessaoDejulgamentoService.listarTodasAsSessoesDeJulgamento().subscribe({
      next: (data) => {
        this.sessoes = data;
      },
      error: (error) => {
        console.log(error);
        this.alerta = {
          nome: "Error", 
          tipo: "error", 
          titulo: "Erro",
          mensagem: error.message
        }
        this._alertaService.exibirAlerta("Error");
      }
    })


  }

  abrirResposta(): void {
      const dialogRef = this._matDialog.open(FormRespostaComponent, {
          data: {
              resposta: this.resposta,
          },
          width: '560px'
      });
      dialogRef.afterClosed().subscribe(result => {
          this.resposta = result.resposta;
          console.log(result);
          if(result)
            if(result.aceitar)
                this.aprovarSessao();
            else
                this.recusarSessao();
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
    this.alerta = {
      nome: "Pauta-vazia", 
      tipo: "error", 
      titulo: "Pauta vazia",
      mensagem: "Nenhuma sessão de julgamento aberta para o periodo encontrada. Pode haver sessão de julgamento fechadas para o período."
    }
    this._alertaService.exibirAlerta('Pauta-vazia');
  }

  aprovarSessao(){
    let ano: number = 2021;
    let numero: number = 1000;

    this._sessaoDejulgamentoService.aprovarSessaoDeJulgamento(numero, ano, this.resposta).subscribe({
      next: (data) => {
        console.log(data,this.resposta);
      },
      error: (error) => {
        console.log(error);
        this.alerta = {
          nome: "Error", 
          tipo: "error", 
          titulo: "Erro",
          mensagem: error.message
        }
        this._alertaService.exibirAlerta("Error");
      }
    })
  }

  recusarSessao(){
    let ano: number = 2021;
    let numero: number = 1000;

    this._sessaoDejulgamentoService.rejeitarSessaoDeJulgamento(numero, ano, this.resposta).subscribe({
      next: (data) => {
        console.log({resposta:this.resposta, data});
      },
      error: (error) => {
        console.log(error);
        this.alerta = {
          nome: "Error", 
          tipo: "error", 
          titulo: "Erro",
          mensagem: error.message
        }
        this._alertaService.exibirAlerta("Error");
      }
    })
  }
}
