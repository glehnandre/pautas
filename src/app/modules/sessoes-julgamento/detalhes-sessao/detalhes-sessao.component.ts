import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessaoDeJulgamentoService } from 'app/modules/services/sessao-de-julgamento.service';
import { Ministro } from 'app/shared/model/interfaces/ministro.interface';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';

@Component({
  selector: 'digital-detalhes-sessao',
  templateUrl: './detalhes-sessao.component.html',
  styleUrls: ['./detalhes-sessao.component.scss']
})
export class DetalhesSessaoComponent implements OnInit {

  sessao: SessaoDeJulgamento;
  totalMinistrosPresentes: number = 0;
  totalMinistrosAusentes: number = 0;

  constructor(
    private _route: ActivatedRoute,
    private _sessaoDeJulgamentoService: SessaoDeJulgamentoService,
  ) { }

  ngOnInit(): void {
    const numero = +this._route.snapshot.queryParamMap.get('numero');
    const ano = +this._route.snapshot.queryParamMap.get('ano');

    this._sessaoDeJulgamentoService.obterSessaoDeJulgamento(numero, ano).subscribe({
      next: (sessao) => {
        this.sessao = sessao;
        this.totalMinistrosAusentes = this.sessao.ata.ministros_presentes.length;
        this.totalMinistrosAusentes = this.sessao.ata.ministros_ausentes.length;
        console.log(sessao);
      }
    });
  }

}
