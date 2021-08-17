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
  colegiados: Colegiado[] = [];
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

  constructor(
    private _fb: FormBuilder,
    private _ministroService: MinistroService,
  ) { 
    this.formCriacaoColegiado = this._fb.group({
      incluir_voto: [false, [Validators.required]],
      ja_votou: [false, [Validators.required]],
      pode_votar: [false, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._ministroService.listarMinistros().subscribe({
      next: (ministros) => {
        this.ministros = ministros;
        console.log(ministros);
      }
    });

    this._ministroService.listarColegiados().subscribe({
      next: (colegiados) => {
        this.colegiados = colegiados;
      }
    });
  }

  obterStatusDoVoto(votoDoMinistro: VotoDoMinistro): void {
    const index = this.votosDosMinistros
      .findIndex(m => m.ministro.id === votoDoMinistro.ministro.id);
    
    if (index !== -1) {
      this.votosDosMinistros.splice(index, 1);
      const {incluir_voto, ja_votou, pode_votar} = votoDoMinistro.voto;
      if (incluir_voto || ja_votou || pode_votar) {
        this.votosDosMinistros.push({
          ministro: votoDoMinistro.ministro,
          ...votoDoMinistro.voto
        });
      }
    } else {
      this.votosDosMinistros.push({
        ministro: votoDoMinistro.ministro,
        ...votoDoMinistro.voto
      });
    }

    console.table(this.votosDosMinistros);
  }

  finalizar(): void {
    console.log(this.formCriacaoColegiado.value);
  }

}
