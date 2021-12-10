import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Documento } from 'app/modules/acervo/model/interfaces/documento.interface';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<Documento>;
  @Output() link = new EventEmitter();
  @Output() checked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emiteLink(url: string): void {
    this.link.emit(url);
  }

  emiteStatusDoCheckbox(documento: Documento): void {
    this.checked.emit(documento);
  }
}
