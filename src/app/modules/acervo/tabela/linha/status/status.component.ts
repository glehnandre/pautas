import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertaService } from 'app/modules/services/alerta.service';
import { ProcessoService } from 'app/modules/services/processo.service';
import { Status } from 'app/shared/model/interfaces/status.interface';
import { StatusProcesso } from '../../status/situacaoProcesso';


@Component({
  selector: 'digital-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() display: boolean;
  @Input() mobile: boolean;
  @Input() idProcesso: number;
  @Output() statusSelecionado = new EventEmitter();

  status: Status[] = [
    { id: 1, color: "#3C8D40", text: '' },
    { id: 2, color: "#FDC02F", text: '' },
    { id: 3, color: "#BF2210", text: '' },
    { id: 4, color: "#872FA6", text: '' },
    { id: 5, color: "#1170A6", text: '' },
    { id: 6, color: "#3434AC", text: '' },
    { id: 7, color: "#A3F4F6", text: '' },
  ]

  situacaoProcesso: StatusProcesso;

  errorMessage: string;

  constructor(
    private _processoService: ProcessoService,
    private _alertaService: AlertaService,
  ) {}

  ngOnInit(): void {
    this._processoService.obterStatusDoProcesso(this.idProcesso).subscribe({
      next: (status) => {
        this.situacaoProcesso = {
          situacao: status.situacao,
          complemento: status.complemento,
          descricao: status.descricao,
        }
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error.message
        this._alertaService.exibirAlerta("Error");
      }
    });
  }

  public getStatus(): string {
    return this.situacaoProcesso?.situacao.nome;
  }

  public getCorDoStatus(): string {
    return this.status.find(it => it.id === this.situacaoProcesso?.situacao.id)?.color;
  }

  selecionaStatus(status){
    this.statusSelecionado.emit(status)
  }

  print() {

  }
}
