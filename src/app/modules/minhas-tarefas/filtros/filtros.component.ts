import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-filtros',
    templateUrl: './filtros.component.html',
    styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {

    panelOpenState = false;

    constructor() { }

    ngOnInit(): void {
    }

}
