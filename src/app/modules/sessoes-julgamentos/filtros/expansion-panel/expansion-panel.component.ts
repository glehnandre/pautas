import { Component, Input, OnInit } from '@angular/core';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {

  panelOpenState: boolean = false;
  
  @Input() hasImage: boolean = false;
  @Input() label: string = '';
  @Input() Selected: boolean = false;
  @Input() conteudos: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  teste(){
    console.log(this.conteudos);
    
  }

}
