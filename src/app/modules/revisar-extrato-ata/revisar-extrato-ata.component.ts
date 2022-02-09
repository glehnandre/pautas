import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JulgamentoService } from '../services/julgamento.service';
import { Ata } from '../acervo/model/interfaces/ata.interface';
import { MatDialog } from '@angular/material/dialog';
import { PublicarFormComponent } from './publicar-form/publicar-form.component';
import { CorrecaoCapituloFormComponent } from './correcao-capitulo-form/correcao-capitulo-form.component';
import { PublicacaoService } from '../services/publicacao.service';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';

interface Parametros {
    numero: number;
    ano: number;
}

@Component({
  selector: 'app-revisar-extrato-ata',
  templateUrl: './revisar-extrato-ata.component.html',
  styleUrls: ['./revisar-extrato-ata.component.scss']
})
export class RevisarExtratoAtaComponent implements OnInit {

  parametros: Parametros;
  sessao: SessaoJulgamento;
  ata: Ata;
  form: any;
  tags: string[];


  constructor(
      private _julgamentoService: JulgamentoService,
      private _publicacaoService: PublicacaoService,
      private _matDialog: MatDialog,
      private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.parametros = this._route.snapshot.queryParams as Parametros;
    this.getSessaoDeJulgamento();
    this.getAta();
  }

  private getAta() {
    this._julgamentoService.getAta(this.parametros.numero, this.parametros.ano).subscribe({
      next: (ata) => {
        console.log("Ata");
        console.log(ata);
        this.ata = ata;
      }
    });
  }

  private getSessaoDeJulgamento() {
    this._julgamentoService.listarSessoesDeJulgamento(this.parametros.numero, this.parametros.ano).subscribe({
      next: (sessao) => {
        this.sessao = sessao;
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

        this._publicacaoService.publicarAta(data.toISOString(), this.sessao).subscribe(r=>{
          console.log(r);
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
