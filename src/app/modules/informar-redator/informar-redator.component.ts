import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stringify } from 'crypto-js/enc-base64';
import { Ministro } from '../acervo/model/interfaces/ministro.interface';
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
  redator: Ministro;
  relator: Ministro;
  votos: Voto[] = [];

  descrissaoSessao: string;
  data_fim: Date;

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
          this.data_fim = new Date(this.dados.sessao?.data_fim);

          const { classe, numero, abreviacao, relator: relator } = this.dados.processo;
          this.classe = classe;
          this.numero = numero;
          this.abreviacao = abreviacao;
          this.relator = relator.ocupante;

          this._processoService.obterVotosDoProcesso(`${classe}${numero}-${abreviacao}`).subscribe({
            next: (votos) => {
              this.votos = votos;
              console.log(this.votos);
            }
          });
        }
    });
  }

  acompanharamRelator(): Ministro[] {
    const votoRelator = this.votos.find(voto => voto.autor?.id == this.relator.id);
    return votoRelator?.acompanharam;
  }

  relatorDiverge(): Voto[] {
    const relatorDiverge = this.votos
        .filter(voto => !voto.acompanharam
            .filter(({ id }) => id === this.relator.id)
            .length
        );
    return relatorDiverge;
  }

  ministrosString(ministros: Ministro[]): string {
    let nomesMinistros = [];
    ministros.forEach(ministro => nomesMinistros.push(ministro.nome));
    return nomesMinistros?.join(', ');
  }

  getRedator(): string {
    return this.dados?.processo?.redator?.ocupante?.nome;
  }

  selecionarRedator(): void {
      const form = {
          redator: this.redator
      };
      this.redatorForm.setValue(form);
  }

  informarRedator(): void {
      console.log(this.redator);
  }
}
