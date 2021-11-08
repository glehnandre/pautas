import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { ProcessoService } from '../services/processo.service';
import { RevisarInteiroTeorService } from '../services/revisar-inteiro-teor.service';

@Component({
  selector: 'app-revisar-inteiro-teor',
  templateUrl: './revisar-inteiro-teor.component.html',
  styleUrls: ['./revisar-inteiro-teor.component.scss']
})
export class RevisarInteiroTeorComponent implements OnInit {

  idProcesso: number = 0;
  colegiado: string = '';
  processo: Processo;

  constructor(
    private _route: ActivatedRoute,
    private _inteiroTeorService: RevisarInteiroTeorService,
  ) { }

  ngOnInit(): void {
    this.idProcesso = +this._route.snapshot.queryParamMap.get('id');
    this.colegiado = this._route.snapshot.queryParamMap.get('colegiado');

    this._inteiroTeorService.obterInteiroTeorDoAcordao(this.idProcesso).subscribe({
      next: (data) => {
        console.log(data)
      }
    });
  }

}
