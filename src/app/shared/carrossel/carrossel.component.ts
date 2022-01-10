import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, AfterContentChecked, OnDestroy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-carrossel',
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  }
})

export class CarrosselComponent implements OnInit, OnChanges, OnDestroy, AfterContentChecked {

  @Input() chips: string[] = [];
  @Input() hasIcon: boolean = false;
  @Input() class: string[] = [];
  @Input() idChip:string = '';
  @Input() lastId:string;
  @Input() links: string[] = [];
  @Input() hasArrow: boolean = true;
  @Input() idLinha: number;
  @Input() hasBtnRemove: boolean= false;
  @Input() conteudosNoChipParaSerRemovivel: string[]= [];

  @Output() nomeDoPdfSelecionado = new EventEmitter<string>();
  @Output() linkDoPdfSelecionado = new EventEmitter<string>();
  @Output() chipRemovido = new EventEmitter<string>();
  @Output() onClick = new EventEmitter<{click: boolean, chip: string}>();

  constructor(private cd: ChangeDetectorRef) { }

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
  comparaTamanho(id: string): boolean{
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

  handleKeyboardEvent(event: KeyboardEvent): void {
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

  abrirLink(index: number): void {
    if (this.links.length > 0 && this.links[index]) {
      this.nomeDoPdfSelecionado.emit(this.chips[index]);
      this.linkDoPdfSelecionado.emit(this.links[index]);
    }
  }

  /**
   * @public Método público
   * @description Método para remover o chip da lista de chips
   * @param chip Chip que deverá ser removido
   * @author Douglas da Silva Monteles
   */
  public removerChip(chip: string): void {
    const index = this.chips.findIndex(c => c === chip);

    if (index !== -1) {
      this.chips.splice(index, 1);
      this.chipRemovido.emit(chip);
    }
  }

  public isChipRemovivel(chip: string): boolean {
    for (let i = 0; i < this.conteudosNoChipParaSerRemovivel.length; i++) {
      if (chip.toLocaleLowerCase().includes(this.conteudosNoChipParaSerRemovivel[i].toLocaleLowerCase())) {
        return true;
      }
    }
    return false;
  }

}
