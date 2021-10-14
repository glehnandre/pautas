import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, AfterContentChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carrossel',
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  }
})

export class CarrosselComponent implements OnInit, OnDestroy, AfterContentChecked {

  @Input() chips: string[] = [];
  @Input() hasIcon: boolean = false;
  @Input() class: string[] = [];
  @Input() idChip:string = '';
  @Input() lastId:string;
  @Input() links: string[] = [];
  @Input() hasArrow: boolean = true;
  @Input() idLinha: number;

  @Output() linkDoPdfSelecionado = new EventEmitter<string>();

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
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
      this.linkDoPdfSelecionado.emit(this.links[index]);
    }
  }

}
