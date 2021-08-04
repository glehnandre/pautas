import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Processo } from '../../model/interfaces/processo.interface';


@Component({
  selector: 'app-linha',
  templateUrl: './linha.component.html',
  styleUrls: ['./linha.component.scss']
})
export class LinhaComponent implements OnInit {
  @Output() display: boolean = false;
  @Output() mobile: boolean = false;
  @Output() checked = new EventEmitter<Processo>();
  @Output() tagSelecionada = new EventEmitter();

  @Input() Selected: boolean;
  @Input() processo: Processo;
  
  panelOpenState = false;

  constructor() {

    if (document.body.clientWidth <= 1000) {
      this.mobile = !this.mobile
    }
  }

  ngOnInit(): void {}

  emiteStatusDoCheckbox(status: MatCheckboxChange) {
    this.processo.checked = status.checked;
    this.checked.emit(this.processo);
  }
  
  filtrarPorTags(tag) {
    this.tagSelecionada.emit(tag)
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
