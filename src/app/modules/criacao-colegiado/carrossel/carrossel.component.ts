import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FuseDrawerService } from '@fuse/components/drawer';
import { Tag } from 'app/modules/acervo/model/interfaces/tag.interface';

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
  @Input() links: string[] = [];

  @Output() linkDoPdfSelecionado = new EventEmitter<string>();

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

  abrirLink(index: number): void {
    if (this.links[index]) {
      this.linkDoPdfSelecionado.emit(this.links[index]);
    }
  }

}
