import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SituacaoDoProcesso } from 'app/modules/acervo/model/enums/situacaoDoProcesso.enum';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { SessaoDeJulgamento } from 'app/modules/acervo/model/interfaces/sessaoDeJulgamento.interface';
import { JulgamentoService } from 'app/modules/services/julgamento.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sessao-extraordinaria',
  templateUrl: './sessao-extraordinaria.component.html',
  styleUrls: ['./sessao-extraordinaria.component.scss']
})
export class SessaoExtraordinariaComponent implements OnInit {

  formJulgamento: FormGroup;
  tags: string[] = ['Virtual', 'Segunda Turma', 'Inicio e fim no dia 21/04/2021'];
  observacoes: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro minima quibusdam perspiciatis aliquid iste quo deleniti  ducimus nulla minus rerum expedita tenetur, dicta saepe error unde,  labore cum, aperiam nisi. Lorem ipsum dolor sit amet consectetur adipisicing elit.  Odit sequi magni, modi reprehenderit sit ipsa tempora natus  harum voluptatem iure molestias, veniam nemo quam odio qui laboriosam.  Pariatur, praesentium molestiae?";
  processos: Processo[] = [];
  sessao: SessaoDeJulgamento;

  constructor(
    private _julgamentoService: JulgamentoService,
    private _httpClient: HttpClient,
  ) {}

  ngOnInit(): void {
    this._julgamentoService.listarSessoesDeJulgamento(1000, 2021).subscribe({
      next: (julg) => {
        this.sessao = julg.sessao;
        const { numero, ano, data_inicio, data_fim } = this.sessao;
        this._julgamentoService.listarProcessosPautadosNasSessoes(numero, ano, SituacaoDoProcesso.Pautado, data_inicio, data_fim).subscribe({
          next: (processos) => {
            this.processos = processos;
          }
        });
      }
    });
  }

  /*teste(){
    let ano: number = 2021;
    console.log(this._httpClient.get(`/sessoes-de-julgamento/${ano}`));
  }*/

}
