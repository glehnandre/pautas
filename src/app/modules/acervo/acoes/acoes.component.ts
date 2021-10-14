import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertService } from '@fuse/components/alert';
import { ProcessoService } from 'app/modules/services/processo.service';
import { SituacaoDoProcesso } from '../model/enums/situacaoDoProcesso.enum';
import { Processo } from '../model/interfaces/processo.interface';
import { AgruparEmlistaComponent } from './agrupar-emlista/agrupar-emlista.component';
import { AlertaComponent } from './agrupar-emlista/gerenciar-listas/alerta/alerta.component';
import { AlterarSessaoComponent } from './alterar-sessao/alterar-sessao.component';
import { ReanalizarComponent } from './reanalizar/reanalizar.component';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.scss']
})
export class AcoesComponent implements OnInit {
  @Output() allSelected = new EventEmitter();
  @Output() colecaoIdsDasTags = new EventEmitter<Array<{id: number}>>();

  @Input() processos: Processo[] = [];

  public alerta: {
    titulo: string;
    mensagem: string;
  };

  mobile: boolean;

  constructor(
    private _httpClient: HttpClient,
    private _matDialog: MatDialog,
    private _fuseAlertService: FuseAlertService,
    private _processoService: ProcessoService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    if (document.body.clientWidth <= 800) {
      this.mobile = true;
    }
    else {
      this.mobile = false;
    }
  }


  ngOnInit(): void {
    this._processoService.obterProcessosSelecionados().subscribe((processos) => {
      this.processos = processos;
    });

    this.alerta = {
      titulo: 'Erro de validação',
      mensagem: 'Selecione um ou mais processos',
    };
  }

  selectAll(completed): void {
    //console.log(this.processos);

    this.processos.forEach((processo) => {
      processo.checked = completed.checked;
    });
    this.allSelected.emit(completed);
  }

  onResize(): void {
    if (document.body.clientWidth <= 800) {
      this.mobile = true;
    }
    else {
      this.mobile = false;
    }
  }

  abrirModalAgruparTags(): void {
    if(!this.verificaProcesso()){
      this.mostrarAlerta();
    }
    else{

      const dialogRef = this._matDialog.open(AgruparEmlistaComponent, {
        maxHeight: '560px',
      });

      dialogRef.afterClosed().subscribe((tags: Array<{id: number}>) => {
        if (tags.length) {
          this.colecaoIdsDasTags.emit(tags);
        }
      });
    }
  }

  openComposeDialog(): void {
    if(!this.verificaProcesso()){
      this.mostrarAlerta();
    }
    else if(!this.filtrarProcesso('Apto a Pautar')){
      // Open the dialog
      this._router.navigate(['pautar'], {relativeTo: this._route});
    }
  }

  verificaProcesso(): boolean {
    if(this.processos.length === 0) {
      return false;
    }
    return true;
  }

  mostrarAlerta(): void{
    this.alertaDeErro('Erro de validação', 'Selecione um ou mais processos');
  }

  retirarDePauta(): void {
    if(!this.verificaProcesso()){
      this.mostrarAlerta();
    }
    else if(!this.filtrarProcesso('Pautado')){
      const dialogRef = this._matDialog.open(AlertaComponent, {
        data: {
          titulo: 'Retirar processo',
          mensagem: `Você tem certeza que deseja retirar esse(s) processo(s) de pauta?\n
                    ${this._processoService.exibeDescricaoDosProcessos(this.processos)}
                    `,
        }
      });

      dialogRef.afterClosed().subscribe((resultado) => {
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
    /**
     * @param {string} situacao
     * Filtra os processos selecionados, para que remova e alerte ao usuário,
     * que aquela ação só pode ser feita para processos com a situação passada,
     * as ações possiveis esta em acervo/model/enums/situacaoDoProcesso.enum.ts
     */

    const processosRemovidos = []; const processosSelecinados = [];
    this.processos.forEach((processo, i) => {

      if (processo.situacao !== SituacaoDoProcesso[situacao]) {
          processosRemovidos.push(processo);
      }
      else{
          processosSelecinados.push(processo);
      }
    });

    this._processoService.setProcessosSelecionados(processosSelecinados);

    if(processosRemovidos.length) {
      const titulo = processosRemovidos.length === 1 ?
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
    this.filtrarProcesso('Pautado');
    if (!this.verificaProcesso()) {
      this.mostrarAlerta();
    } else {
      const dialogRef = this._matDialog.open(AlterarSessaoComponent, {
        data: this.processos,
      });
      dialogRef.afterClosed().subscribe((resultado) => {});
    }
  }
}
