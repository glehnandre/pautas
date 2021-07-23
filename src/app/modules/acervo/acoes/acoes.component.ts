import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseAlertService } from '@fuse/components/alert';
import { ProcessoCheckboxProps } from '../tabela/linha/linha.component';
import { AgruparEmlistaComponent } from './agrupar-emlista/agrupar-emlista.component';
import { AlertaComponent } from './agrupar-emlista/gerenciar-listas/alerta/alerta.component';
import { PautarComponent } from './pautar/pautar.component';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.scss']
})
export class AcoesComponent implements OnInit {

  mobile: boolean;
  @Output() Allselected = new EventEmitter();
  @Output() colecaoIdsDasTags = new EventEmitter<Array<{id: number}>>();

  @Input() processos: ProcessoCheckboxProps[];
 
  constructor(private _matDialog: MatDialog, private _fuseAlertService: FuseAlertService) {
    if (document.body.clientWidth <= 800) {
      this.mobile = true
    }
    else {
      this.mobile = false
    }
  }


  ngOnInit(): void {
  }

  selectAll(completed) {
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
    if(!this.verificaProcesso()){
      this.mostrarAlerta();
    }
    else{
      this.fecharAlerta();
      // Open the dialog
      const dialogRef = this._matDialog.open(PautarComponent);

      dialogRef.afterClosed()
        .subscribe((result) => {
          console.log('Compose dialog was closed!');
        });
    }
  }

  verificaProcesso(): boolean{
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
    const dialogRef = this._matDialog.open(AlertaComponent, {
      data: {
        titulo: 'Retirar processo',
        mensagem: `Você tem certeza que deseja retirar esse(s) processo(s) de pauta? 
                   
                  ${this.exibeDescricaoDosProcessos()}
                  
                  `,
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado === 'ok') {
        // DELETE
        
      } else {
        dialogRef.close();
      }
    });
  }

  exibeDescricaoDosProcessos(): string {
    let descricoes = ``;

    this.processos.forEach(processo => {
      descricoes += `${processo.descricao}\n`;
    });

    return descricoes;
  }

}
