import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Ata } from 'app/shared/model/interfaces/ata.interface';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';
import { AlertaService } from '../services/alerta.service';
import { PublicacaoService } from '../services/publicacao.service';
import { SessaoDeJulgamentoService } from '../services/sessao-de-julgamento.service';
import { CorrecaoCapituloFormComponent } from './correcao-capitulo-form/correcao-capitulo-form.component';
import { PublicarFormComponent } from './publicar-form/publicar-form.component';




interface Parametros {
    numero: number;
    ano: number;
}

@Component({
  selector: 'digital-revisar-extrato-ata',
  templateUrl: './revisar-extrato-ata.component.html',
  styleUrls: ['./revisar-extrato-ata.component.scss']
})
export class RevisarExtratoAtaComponent implements OnInit {

  parametros: Parametros;
  sessao: SessaoDeJulgamento;
  ata: Ata;
  form: any;
  tags: string[];

  errorMessage: string;

  constructor(
      private _sessaoDejulgamentoService: SessaoDeJulgamentoService,
      private _publicacaoService: PublicacaoService,
      private _matDialog: MatDialog,
      private _route: ActivatedRoute,
      private _alertaService: AlertaService,
  ) { }

  ngOnInit(): void {
    this.parametros = this._route.snapshot.queryParams as Parametros;
    this.getSessaoDeJulgamento();
    this.getAta();
  }

  private getAta() {
    this._sessaoDejulgamentoService.getAta(this.parametros.numero, this.parametros.ano).subscribe({
      next: (ata) => {
        this.ata = ata;
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.message
        this._alertaService.exibirAlerta("Error");
      }
    });
  }

  private getSessaoDeJulgamento() {
    this._sessaoDejulgamentoService.listarSessoesDeJulgamento(this.parametros.numero, this.parametros.ano).subscribe({
      next: (sessao) => {
        this.sessao = sessao;
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.message
        this._alertaService.exibirAlerta("Error");
      }
    });
  }

  /**
   * Abre o Formulário para Publicar Extrato
  **/
  publicar(): void {
    const dialogRef = this._matDialog
      .open(PublicarFormComponent, {
        data: this.sessao,
        maxWidth: '100vw'
    });

    dialogRef.afterClosed().subscribe({
      next: (form) => {
        this.form = form;

        let data;
        if(form.dataPublicacao._d) data = new Date(form.dataPublicacao._d);
        else data = new Date(form.dataPublicacao);

        this._publicacaoService.publicarAta(data.toISOString(), this.sessao).subscribe({
          next: (r) => {
            console.log(r);
          },
          error: (error) => {
            console.log(error);
            this.errorMessage = error.message
            this._alertaService.exibirAlerta("Error");
          }
        })
      }
    });
  }

  corrigir(): void {
    const dialogRef = this._matDialog
      .open(CorrecaoCapituloFormComponent, {
        data: {
          id_sessao: this.sessao.id,
          processos: this.sessao.processos,
        },
        maxHeight: '100vh', maxWidth: '100vw'
      });

    dialogRef.afterClosed().subscribe({
      next: () => {}
    })
  }
}
