import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Impedimento } from 'app/modules/acervo/model/interfaces/impedimento.interface';

@Component({
  selector: 'app-impedimento',
  templateUrl: './impedimento.component.html',
  styleUrls: ['./impedimento.component.scss']
})
export class ImpedimentoComponent implements OnInit {

  label: string = "Possível motivo de impedimento";
  tipo: string;
  relacionamento: string;
  descricao: string;
  observacao: string;

  constructor(
    private _dialogRef: MatDialogRef<ImpedimentoComponent>,
    @Inject(MAT_DIALOG_DATA) private _impedimento: Impedimento,
  ) { }

  ngOnInit(): void {
    if(this._impedimento.tipo=="Suspeição") this.label = "Possível motivo de suspeição"
    this.tipo = this._impedimento.tipo;
    this.relacionamento = this._impedimento.relacionamento;
    this.descricao = this._impedimento.descricao;
    this.observacao = this._impedimento.observacao;
  }

}
