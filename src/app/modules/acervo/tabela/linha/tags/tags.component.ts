import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tag } from 'app/shared/model/interfaces/tag.interface';


@Component({
  selector: 'digital-tags',
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
