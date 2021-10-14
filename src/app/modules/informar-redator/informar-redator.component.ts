import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { Voto } from '../acervo/model/interfaces/voto.interface';
import { ProcessoService } from '../services/processo.service';
import { ResultadoJulgamentoService } from '../services/resultado-julgamento.service';

@Component({
  selector: 'app-informar-redator',
  templateUrl: './informar-redator.component.html',
  styleUrls: ['./informar-redator.component.scss']
})
export class InformarRedatorComponent implements OnInit {

  dados: any;
  classe: string;
  numero: string;
  abreviacao: string;
  redatorForm: FormGroup;
  processosPorTags: Processo[] = [];
  votos: Voto[] = [];

  descrissaoSessao: string;
  data_fim: string;

  constructor(
      private _formBuilder: FormBuilder,
      private _processoService: ProcessoService,
      private _resultadoJulgamento: ResultadoJulgamentoService,
  ) {
    this.redatorForm = this._formBuilder.group({
        redator: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {

    this._resultadoJulgamento.listarDecisoes().subscribe({
        next: (data) => {
          this.dados = data;
          console.log(data);

          const tags = this.dados.processo.lista.map(tag => tag.id);

          this._processoService.listarProcessos(new HttpParams().set('tag', tags)).subscribe({
            next: (processos) => {
              setTimeout(() => {
                this.processosPorTags = processos;
              }, 3000)
            }
          });


        this.descrissaoSessao = `${this.dados.sessao?.numero}/${this.dados.sessao?.ano}`;

        const data_fim = new Date(this.dados.sessao?.data_fim);
        this.data_fim = this.formatData(data_fim);


          const { classe, numero, abreviacao } = this.dados.processo;
          this.classe = classe;
          this.numero = numero;
          this.abreviacao = abreviacao;

          this._processoService.obterVotosDoProcesso(`${classe}${numero}-${abreviacao}`).subscribe({
            next: (votos) => {
              this.votos = votos;
              console.log(this.votos);
            }
          });
        }
    });
  }

  private formatData(data: Date): string {
    const dia = ("00" + data.getDate()).slice(-2);
    const mes = ("00" + (data.getMonth() + 1)).slice(-2);
    const ano = ("00" + data.getFullYear()).slice(-4);
    return `${dia}/${mes}/${ano}`;
  }

  getRedator(): string {
      return //this.dados?.processo?.redator?.ocupante?.nome;
  }
  getRelator(): string {
    return this.dados.processo.relator.ocupante.nome;
  }

  escolherRedator(): void {
      console.log(this.redatorForm.getRawValue());
  }
}
