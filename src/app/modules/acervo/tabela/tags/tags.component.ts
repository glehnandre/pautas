import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../../acoes/agrupar-emlista/agrupar-emlista.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @Input() tags: Tag[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
