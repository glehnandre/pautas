import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'digital-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {

  panelOpenState: boolean = false;
  
  @Input() id: string;
  @Input() hasImage: boolean = false;
  @Input() label: string = '';
  @Input() Selected: boolean = false;
  @Input() conteudos: any[] = [];
  @Output() statusFiltroForm = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   * @param data conteúdo que será emitido para outro componente
   */
  emiteObjeto(data){
    this.statusFiltroForm.emit({
      conteudo: data,
    })
  }

  /**
   * 
   * @param name nome do conteúdo que será emitido para outro componente
   * @param value conteúdo que será emitido para outro componente
   */
  emiteMinistro(value, name: string){
    const checked = false;
    const source = {value, name};

    this.statusFiltroForm.emit({
      conteudo: {checked, source}
    })
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
