import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sessao-extraordinaria',
  templateUrl: './sessao-extraordinaria.component.html',
  styleUrls: ['./sessao-extraordinaria.component.scss']
})
export class SessaoExtraordinariaComponent implements OnInit {

  tags: string[] = ['Virtual', 'Segunda Turma', 'Inicio e fim no dia 21/04/2021'];
  observacoes: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro minima quibusdam perspiciatis aliquid iste quo deleniti  ducimus nulla minus rerum expedita tenetur, dicta saepe error unde,  labore cum, aperiam nisi. Lorem ipsum dolor sit amet consectetur adipisicing elit.  Odit sequi magni, modi reprehenderit sit ipsa tempora natus  harum voluptatem iure molestias, veniam nemo quam odio qui laboriosam.  Pariatur, praesentium molestiae?";

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
