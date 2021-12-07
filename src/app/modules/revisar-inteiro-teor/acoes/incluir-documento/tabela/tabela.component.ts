import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Documento } from 'app/modules/acervo/model/interfaces/documento.interface';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<Documento>;

  constructor() { }

  ngOnInit(): void {
  }

}
