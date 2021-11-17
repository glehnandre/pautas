import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  @Input() titulo: string;
  @Input() mensagem: string;
  @Input() nome: string;
  @Input() aparencia: 
    | 'soft' 
    | 'outline' 
    | 'fill';
  @Input() tipo: 
    | 'primary'
    | 'accent'
    | 'warn'
    | 'basic'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';

  constructor() { }

  ngOnInit(): void {
  }

}
