import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sessoes-julgamentos',
  templateUrl: './sessoes-julgamentos.component.html',
  styleUrls: ['./sessoes-julgamentos.component.scss']
})
export class SessoesJulgamentosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  eventsSubject: Subject<any> = new Subject<any>();

}
