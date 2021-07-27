import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {

  @Input() numero: number;
  @Input() classe: string;

  constructor() {}

  ngOnInit(): void {
  }

}
