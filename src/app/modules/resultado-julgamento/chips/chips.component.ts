import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacaoComponent } from 'app/shared/dialogo-confirmacao/dialogo-confirmacao.component';

interface Chip {
  id?: number;
  nome: string;
}

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit, OnChanges, OnDestroy, AfterContentChecked {

  @Input() chips: Array<Chip> = [];
  @Input() hasIcon: boolean = false;
  @Input() class: string[] = [];
  @Input() idChip:string = '';
  @Input() lastId:string;
  @Input() hasArrow: boolean = true;
  @Input() idLinha: number;
  @Input() hasBtnRemove: boolean= false;
  @Input() conteudosNoChipParaSerRemovivel: string[]= [];

  @Output() chipRemovido = new EventEmitter<Chip>();
  @Output() onClick = new EventEmitter<{click: boolean, chip: string}>();

  constructor(
    private cd: ChangeDetectorRef,
    private _dialog: MatDialog,  
  ) { }

  ngOnInit(): void {}

  ngOnChanges(changes): void {
    
  }
  
  ngAfterContentChecked(){
    this.cd.detectChanges();
  }

  ngOnDestroy(){
    this.cd.detectChanges();
  }

  /**
   *
   * @param id o id do elemento que eu quero comparar o tamanho com o id+'2'
   */
  public comparaTamanho(id: string): boolean {
    let elemExterno = document.getElementById(id);
    let elemInterno = document.getElementById(id+'2');
    if(elemExterno && elemInterno){
      let tamExterno = elemExterno.getBoundingClientRect();
      let tamInterno = elemInterno.getBoundingClientRect();
      if(tamExterno.width <= tamInterno.width && this.hasArrow==true){
        return true;
      }
    }
    return false;
  }

  public handleKeyboardEvent(event: KeyboardEvent): void {
    if(event.key === 'ArrowRight') {this.scrollRight(this.lastId);}
    else if(event.key === 'ArrowLeft') {this.scrollLeft(this.lastId);}
  }

  /**
   *
   * @param id o id do elemento que eu quero fazer o scrollLeft
   */
  public scrollLeft(id): void {
    if(id){
      const el = document.getElementById(id);
      el.scrollTo({ left: (el.scrollLeft - 150), behavior: 'smooth' });
    }
  }
  public scrollRight(id: string): void {
    if(id){
      const el = document.getElementById(id);
      document.getElementById(id).scrollTo({ left: (el.scrollLeft + 150), behavior: 'smooth' });
    }
  }

  /**
   * @public Método público
   * @description Método para remover o chip da lista de chips
   * @param chip Chip que deverá ser removido
   * @author Douglas da Silva Monteles
   */
  public removerChip(chip: Chip): void {
    const dialogRef = this._dialog.open(DialogoConfirmacaoComponent, {
      data: {
        titulo: 'Exclusão de Vista ou Destaque',
        mensagem: `Confirma a exclusão do(a) ${chip.nome}?`
      },
    });

    dialogRef.afterClosed().subscribe(confirmacao => {
      if (confirmacao) {
        const index = this.chips.findIndex(c => JSON.stringify(c) === JSON.stringify(chip));

        if (index !== -1) {
          this.chips.splice(index, 1);
          this.chipRemovido.emit(chip);
        }
      }
    });
  }

  public isChipRemovivel(chipRemovivel: Chip): boolean {
    const chip = JSON.stringify(chipRemovivel);

    for (let i = 0; i < this.conteudosNoChipParaSerRemovivel.length; i++) {
      if (chip.toLocaleLowerCase().includes(this.conteudosNoChipParaSerRemovivel[i].toLocaleLowerCase())) {
        return true;
      }
    }
    return false;
  }

}
