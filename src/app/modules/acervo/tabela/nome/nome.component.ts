import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nome',
  templateUrl: './nome.component.html',
  styleUrls: ['./nome.component.scss']
})
export class NomeComponent implements OnInit {
  
  @Input() text: string;

  constructor() {}

  ngOnInit(): void {
  }

}
