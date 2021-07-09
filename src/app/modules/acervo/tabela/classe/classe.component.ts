import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {
  classe: string;
  constructor() { 
    this.classe = "ARE 712345"
  }

  ngOnInit(): void {
  }

}
