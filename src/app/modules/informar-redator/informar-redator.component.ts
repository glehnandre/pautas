import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ministro } from 'app/shared/model/interfaces/ministro.interface';
import { Voto } from 'app/shared/model/interfaces/voto.interface';
import { AlertaService } from '../services/alerta.service';
import { MinistroService } from '../services/ministro.service';
import { ProcessoService } from '../services/processo.service';

interface Parametros {
    processo: number;
    colegiado: string;
    sessao: number;
}

@Component({
  selector: 'digital-informar-redator',
  templateUrl: './informar-redator.component.html',
  styleUrls: ['./informar-redator.component.scss']
})
export class InformarRedatorComponent implements OnInit {
  parametros: Parametros;
  processo: string;
  votos: Voto[] = [];

  redatorForm: FormGroup;
  nomeRedator: string;
  redator: Ministro;
  relator: Ministro;
  acompanharamRelator: Ministro[];

  errorMessage: string;

  constructor(
      private _formBuilder: FormBuilder,
      private _processoService: ProcessoService,
      private _ministroService: MinistroService,
      private _route: ActivatedRoute,
      private _alertaService: AlertaService,
  ) {
    this.redatorForm = this._formBuilder.group({
        redator: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.parametros = this._route.snapshot.queryParams as Parametros;

    this._processoService
      .listarProcessos(this.parametros.processo)
      .subscribe({
        next: ([ processo ]) => {
          const { cadeia: nome, classe, numero } = processo;
          this.processo = `${classe} ${numero} ${nome}`;
          this.relator = processo.relator;
          this.nomeRedator = processo.redator?.nome;

          this._processoService
            .obterVotosDoProcesso(this.parametros.processo)
            .subscribe({
              next: (votos) => {
                this.votos = votos;
                this.acompanharamRelator = votos
                    .find(voto => voto.autor?.id == this.relator.id)
                    .acompanharam;
              },
              error: (error) => {
                console.log(error);
                this.errorMessage = error.message
                this._alertaService.exibirAlerta("Error");
              }
          });
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = error.message
          this._alertaService.exibirAlerta("Error");
        }
    });
  }

  relatorDiverge(): Voto[] {
    const relatorDiverge = this.votos
        .filter(voto => !voto.acompanharam
            .filter(({ id }) => id === this.relator.id)
            .length
        );
    return relatorDiverge;
  }

  autorEAcompanhante(voto: Voto): Ministro[] {
      return [voto.autor, ...voto.acompanharam];
  }

  ministrosString(ministros: Ministro[]): string {
    return ministros.length ? this._ministroService.ministrosString(ministros) +
          (ministros.length == 1 ? ' acompanha': ' acompanham'): '';
  }

  selecionarRedator(): void {
      const form = {
          redator: this.redator
      };
      this.redatorForm.setValue(form);
  }

  informarRedator(): void {
      
  }
}
