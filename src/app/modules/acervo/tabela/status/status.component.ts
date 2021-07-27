import { Component, Input, OnInit } from '@angular/core';

interface Status {
  id: number;
  color: string;
  text: string;
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() display: boolean;
  @Input() mobile: boolean;
  @Input() idSituacao: number;

  status: Status[] = [
    { id: 1, color: "#3C8D40", text: "APTO A PAUTAR" },
    { id: 2, color: "#FDC02F", text: "EM JULGAMENTO" },
    { id: 3, color: "#BF221o", text: "VISTO MDT" },
    { id: 4, color: "#1170A6", text: "PAUTADO" },
    { id: 6, color: "#3434AC", text: "RETIRADO DE PAUTA" },
  ]

  situacao: Status;

  constructor() {}

  ngOnInit(): void {
    this.situacao = this.status
      .find(status => status.id === this.idSituacao);
  }

  print(){
    console.log(this.display)
  }
}
