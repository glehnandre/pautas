import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carrossel',
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  }
})

export class CarrosselComponent implements OnInit {

  @Input() chips: string[] = [];
  @Input() hasIcon: boolean = false;
  @Input() class: string[] = [];
  @Input() idChip:string = '';
  @Input() lastId:string;
  @Input() links: string[] = [];

  @Output() linkDoPdfSelecionado = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { 
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
      if(tamExterno.width <= tamInterno.width){
        return true;
      }
    }
    return false;
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key=="ArrowRight") this.scrollRight(this.lastId);
    else if(event.key=="ArrowLeft") this.scrollLeft(this.lastId);
  }

  /**
   *
   * @param id o id do elemento que eu quero fazer o scrollLeft
   */
  public scrollLeft(id): void {
    if(id){
      let el = document.getElementById(id);
      el.scrollTo({ left: (el.scrollLeft - 150), behavior: 'smooth' });
    }
  }
  public scrollRight(id: string): void {
    if(id){
      let el = document.getElementById(id);
      document.getElementById(id).scrollTo({ left: (el.scrollLeft + 150), behavior: 'smooth' });
    }
  }

  abrirLink(index: number): void {
    if (this.links.length > 0 && this.links[index]) {
      this.linkDoPdfSelecionado.emit(this.links[index]);
    }
  }

}
