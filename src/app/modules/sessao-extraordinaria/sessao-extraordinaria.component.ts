import { Component, OnInit } from '@angular/core';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';
import { JulgamentoService } from 'app/modules/services/julgamento.service';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { DatePipe } from '@angular/common';
import { FuseAlertService } from '@fuse/components/alert';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertaComponent } from '../acervo/acoes/agrupar-emlista/gerenciar-listas/alerta/alerta.component';
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
    private _matDialog: MatDialog,
    private _julgamentoService: JulgamentoService,
    private _fuseAlertService: FuseAlertService,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const { numero, ano } = this._route.snapshot.queryParams;
    this._julgamentoService.listarSessoesDeJulgamento(numero, ano).subscribe({
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
