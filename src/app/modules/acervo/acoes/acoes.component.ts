import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseAlertService } from '@fuse/components/alert';
import { ProcessoService } from 'app/modules/services/processo.service';
import { SituacaoDoProcesso } from '../model/enums/situacaoDoProcesso.enum';
import { Processo } from '../model/interfaces/processo.interface';
import { AgruparEmlistaComponent } from './agrupar-emlista/agrupar-emlista.component';
import { AlertaComponent } from './agrupar-emlista/gerenciar-listas/alerta/alerta.component';
import { AlterarSessaoComponent } from './alterar-sessao/alterar-sessao.component';
import { PautarComponent } from './pautar/pautar.component';
import { ReanalizarComponent } from './reanalizar/reanalizar.component';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.scss']
})
export class AcoesComponent implements OnInit {

  public alerta: {
    titulo: string,
    mensagem: string,
  }

  mobile: boolean;
  @Output() Allselected = new EventEmitter();
  @Output() colecaoIdsDasTags = new EventEmitter<Array<{id: number}>>();

  @Input() processos: Processo[] = [];

  constructor(
    private _httpClient: HttpClient,
    private _matDialog: MatDialog,
    private _fuseAlertService: FuseAlertService,
    private _processoService: ProcessoService,
  ) {
    if (document.body.clientWidth <= 800) {
      this.mobile = true
    }
    else {
      this.mobile = false
    }
  }


  ngOnInit(): void {
    this._processoService.obterProcessosSelecionados().subscribe(processos => {
      this.processos = processos;
    });

    this.alerta = {
      titulo: 'Erro de validação',
      mensagem: 'Selecione um ou mais processos',
    }
  }

  selectAll(completed) {
    //console.log(this.processos);

    this.processos.forEach((processo) => {
      processo.checked = completed.checked;
    });
    this.Allselected.emit(completed)

  }

  onResize() {
    if (document.body.clientWidth <= 800) {
      this.mobile = true
    }
    else {
      this.mobile = false
    }
  }

  abrirModalAgruparTags() {
    if(!this.verificaProcesso()){
      this.mostrarAlerta();
    }
    else{
      this.fecharAlerta();

      const dialogRef = this._matDialog.open(AgruparEmlistaComponent, {
        maxHeight: '560px',
      });

      dialogRef.afterClosed().subscribe((tags: Array<{id :number}>) => {
        if (tags.length) {
          this.colecaoIdsDasTags.emit(tags);
        }
      });
    }
  }

  openComposeDialog(): void {
    this.filtrarProcesso('Apto a Pautar');
    if(!this.verificaProcesso()){
      this.mostrarAlerta();
    }
    else{
      // Open the dialog
      const dialogRef = this._matDialog.open(PautarComponent, {data: {processos: [...this.processos]}});

      dialogRef.afterClosed()
        .subscribe((result) => {
          console.log('Compose dialog was closed!');
        });
    }
  }

  verificaProcesso(): boolean {
    if(this.processos.length == 0) {
      return false;
    }
    return true;
  }

  mostrarAlerta(){
      this._fuseAlertService.show('alertBox');
  }
  fecharAlerta(){
    this._fuseAlertService.dismiss('alertBox');
  }

  retirarDePauta(): void {
    this.filtrarProcesso('Pautado');
    if (!this.verificaProcesso()) {
      this.mostrarAlerta();
    } else {
      const dialogRef = this._matDialog.open(AlertaComponent, {
        data: {
          titulo: 'Retirar processo',
          mensagem: `Você tem certeza que deseja retirar esse(s) processo(s) de pauta?\n
                    ${this._processoService.exibeDescricaoDosProcessos(this.processos)}
                    `,
        }
      });

      dialogRef.afterClosed().subscribe(resultado => {
        if (resultado === 'ok') {
          // DELETE
          this.processos.forEach(({id}) => {
            this._httpClient.delete(`processos/${id}/pautar`).subscribe({
              next: () => {
                this._processoService.setCarregarProcessos(true);

                this._fuseAlertService.show('sucesso');
                setTimeout(() => {
                  this._fuseAlertService.dismiss('sucesso');
                }, 5000);
              }
            });
          });
        } else {
          dialogRef.close();
        }
      });
    }
  }

  alertaDeErro(titulo: string, mensagem: string): void {
    this.alerta = {
      titulo,
      mensagem,
    };

    this._fuseAlertService.show('alertBox');

    setTimeout(() => {
      this._fuseAlertService.dismiss('alertBox');
    }, 5000);
  }

  filtrarProcesso(situacao: string): string {
    let processosRemovidos = [], processosSelecinados = [];
    this.processos.forEach((processo, i) => {

      if (processo.situacao !== SituacaoDoProcesso[situacao]) {
          processosRemovidos.push(processo);
          processo.checked = false;
      }
      else processosSelecinados.push(processo);
    });

    this._processoService.setProcessosSelecionados(processosSelecinados);

    if(processosRemovidos.length) {
      const titulo = processosRemovidos.length == 1 ?
        `O processo precisa estar com situação de ${situacao}.`:
        `Os processos precisam estar com situação de ${situacao}.`;
      const removidos = this._processoService.exibeDescricaoDosProcessos(processosRemovidos);
      this.alertaDeErro(titulo, removidos);
      return removidos;
    }
  }

  abrirModalDeReanalizar(): void {
    this.filtrarProcesso('Apto a Pautar');
    if (!this.verificaProcesso()) {
      this.mostrarAlerta();
    } else {
      const dialogRef = this._matDialog.open(ReanalizarComponent, {
        data: this.processos,
      });

      dialogRef.afterClosed().subscribe((resultado) => {
        if (resultado === 'ok') {
          this._processoService.setCarregarProcessos(true);
        }
      });
    }
  }

  abrirModalDeAlterarSessao(): void {
    this.filtrarProcesso('Pautado')
    if (!this.verificaProcesso()) {
      this.mostrarAlerta();
    } else {
      const dialogRef = this._matDialog.open(AlterarSessaoComponent, {
        data: this.processos,
      });
      dialogRef.afterClosed().subscribe(resultado => {});
    }
  }
}
