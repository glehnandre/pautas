import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Processo } from '../tabela.component';

export interface ProcessoCheckboxProps {
  processoId: number;
  descricao: string;
  checked?: boolean;
}

@Component({
  selector: 'app-linha',
  templateUrl: './linha.component.html',
  styleUrls: ['./linha.component.scss']
})
export class LinhaComponent implements OnInit {
  @Output() display: boolean = false;
  @Output() mobile: boolean = false;
  @Output() checked = new EventEmitter<Object>();

  @Input() Selected: boolean;
  @Input() processo: Processo;
  
  panelOpenState = false;

  constructor() {

    if (document.body.clientWidth <= 1000) {
      this.mobile = !this.mobile
    }
  }

  ngOnInit(): void {

  }

  emiteStatusDoCheckbox(status: MatCheckboxChange) {
    const data: ProcessoCheckboxProps = {
      processoId: this.processo.id,
      descricao: this.processo.descricao,
      checked: status.checked,
    };
    
    this.checked.emit(data);
  }
  
  onResize() {
    if (document.body.clientWidth <= 1000) {
      this.mobile = true
    }
    else {
      this.mobile = false
    }
  }
}
