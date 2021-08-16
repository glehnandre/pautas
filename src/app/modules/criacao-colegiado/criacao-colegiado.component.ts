import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { map, takeUntil } from 'rxjs/operators';
import { Colegiado, ComposicaoColegiado, NomeDoColegiado } from '../acervo/model/interfaces/colegiado.interface';
import { Ministro } from '../acervo/model/interfaces/ministro.interface';
import { Voto, VotoDoMinistro } from '../acervo/model/interfaces/voto.interface';
import { MinistroService } from '../services/ministro.service';

@Component({
  selector: 'app-criacao-colegiado',
  templateUrl: './criacao-colegiado.component.html',
  styleUrls: ['./criacao-colegiado.component.scss']
})
export class CriacaoColegiadoComponent implements OnInit {

  formCriacaoColegiado: FormGroup;
  ministros: Ministro[] = [];
  colegiado: Colegiado;
  votosDosMinistros: ComposicaoColegiado[] = [];

  post: {
    processo: 'ADI100-Ag-Ag-A',
    anoSessao: '2021',
    numeroSessao: '100',
    julgados: [1, 2, 3],
    items: {
      ministro: {},
      jaVotou: false,
      podeVotar: false,
    },
  };

  columns: number = 3;

  constructor(
    private _fb: FormBuilder,
    private _ministroService: MinistroService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
  ) { 
    this.formCriacaoColegiado = this._fb.group({
      incluir_voto: [false, [Validators.required]],
      ja_votou: [false, [Validators.required]],
      pode_votar: [false, [Validators.required]],
    });
  }

  ngOnInit(): void {
    
    this._fuseMediaWatcherService.onMediaChange$
      .subscribe(({matchingAliases}) => {
        if ( matchingAliases.includes('xl') ) {
          this.columns = 3;
        } else if ( matchingAliases.includes('lg') ) {
          this.columns = 3;
        } else if ( matchingAliases.includes('md') ) {
          this.columns = 3;
        } else if ( matchingAliases.includes('sm') ) {
          this.columns = 2;
        } else {
          this.columns = 1;
        }
      });

    this._ministroService.listarMinistros().subscribe({
      next: (ministros) => {
        this.ministros = ministros;
        console.log(ministros);
      }
    });

    this._ministroService.listarColegiado().subscribe({
      next: (colegiado) => {
        console.log(colegiado)
        this.colegiado = colegiado;
      }
    });
  }

  obterStatusDoVoto(votoDoMinistro: VotoDoMinistro): void {
    this.votosDosMinistros.push({
      ministro: votoDoMinistro.ministro,
      ...votoDoMinistro.voto
    });

    this.votosDosMinistros = [...new Set(this.votosDosMinistros)];

    console.table(this.votosDosMinistros);
  }

  finalizar(): void {
    console.log(this.formCriacaoColegiado.value);
  }

}
