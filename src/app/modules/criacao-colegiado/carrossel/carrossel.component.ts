import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carrossel',
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.scss']
})

export class CarrosselComponent implements OnInit {

  @Input() chips: string[] = [];
  @Input() hasIcon: boolean = false;
  @Input() class: string[] = [];
  @Input() idChip:string;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   * @param id o id do elemento que eu quero fazer o scrollLeft
   */
   public scrollLeft(id): void {
    let el = document.getElementById(id);
    el.scrollTo({ left: (el.scrollLeft - 150), behavior: 'smooth' });
  }
  public scrollRight(id): void {
    let el = document.getElementById(id);
    document.getElementById(id).scrollTo({ left: (el.scrollLeft + 150), behavior: 'smooth' });
  }

}
