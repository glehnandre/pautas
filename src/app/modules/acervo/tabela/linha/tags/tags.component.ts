import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Tag } from 'app/modules/acervo/model/interfaces/tag.interface';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @Input() tags: Tag[] = [];
  @Output() tagSelecionada = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  filtrarPorTags(tag) {
    this.tagSelecionada.emit(tag)
  }
}
