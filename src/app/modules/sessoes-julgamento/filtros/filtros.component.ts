import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformacoesDto } from 'app/shared/model/interfaces/informacoesDto.interface';


interface Filtros {
  agregacao: InformacoesDto;
  selecionados: string[];
}

interface Filtrados {
  filtro: string;
  tipo: string;
}

@Component({
  selector: 'digital-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit, OnChanges{

  formFiltros: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    ) { 
      this.formFiltros = this._fb.group({
        classe: [""],
        numero: [""],
        cadeia: [""],
        data_inicio: [""],
        data_fim: [""],
        colegiado: [""],
        situacao: [""],
        modalidade: [""],
      });
    }

  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges): void {
     
  }

  public filtrar(): void {
    const filtros = {};

    for (const key of Object.keys(this.formFiltros.value)) {
      const valor = this.formFiltros.value[key];

      if (valor && valor !== "") {
        filtros[key] = valor;
      }
    }

    this._router.navigate(['/sessoes-julgamento'], {
      queryParams: filtros,
    });
  }

}
