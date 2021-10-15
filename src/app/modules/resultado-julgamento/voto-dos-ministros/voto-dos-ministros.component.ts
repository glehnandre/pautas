import { Component, Input, OnInit } from '@angular/core';
import { Voto } from 'app/modules/acervo/model/interfaces/voto.interface';

@Component({
  selector: 'app-voto-dos-ministros',
  templateUrl: './voto-dos-ministros.component.html',
  styleUrls: ['./voto-dos-ministros.component.scss']
})
export class VotoDosMinistrosComponent implements OnInit {

  @Input() votos: Voto[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
