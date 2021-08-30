import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Input() idChip:string;
  @Input() lastId:string;

  constructor() { }

  ngOnInit(): void {
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

}
