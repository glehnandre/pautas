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

  formVotacao: FormGroup;
  ministros: Ministro[] = [];
  colegiados: Colegiado[] = [];
  votosDosMinistros: ComposicaoColegiado[] = [];

  post: {
    processo: '',
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
    this.formVotacao = this._fb.group({
      processo: ['ADI100-Ag-Ag-A', Validators.required],
      anoSessao: ['2021', Validators.required],
      numeroSessao: [100, Validators.required],
      julgados: [[1, 2, 3], Validators.required],
      items: [this.votosDosMinistros],
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
        colegiados.map(c => c.composicao.sort((a, b) => {
          if (a.presidente) {
            return -1;
          }

          if (b.presidente) {
            return 1;
          }

          return 0;
        }));
        
        this.colegiados = colegiados;
      }
    });
  }

  obterStatusDoVoto(votoDoMinistro: ComposicaoColegiado): void {
    const index = this.votosDosMinistros
      .findIndex(m => m.ministro.id === votoDoMinistro.ministro.id);
    
    if (index !== -1) {
      this.votosDosMinistros.splice(index, 1);
      const {incluir_voto, ja_votou, pode_votar} = votoDoMinistro;
      if (incluir_voto || ja_votou || pode_votar) {
        this.votosDosMinistros.push({
          ...votoDoMinistro,
          incluir_voto,
          ja_votou,
          pode_votar,
        });
      }
    } else {
      this.votosDosMinistros.push(votoDoMinistro);
    }

    console.table(this.votosDosMinistros)
  }

  isSelecoesValidas(): boolean {
    const MIN_VOTOS: number = 5;
    const MAX_VOTOS: number = 10;

    if (this.votosDosMinistros.length === 0) {
      alert('Nunhum voto selecionado!');
      return false;
    }

    if (this.votosDosMinistros.length < MIN_VOTOS) {
      alert('Número minimo de votos: ' + MIN_VOTOS);
      return false;
    }

    if (this.votosDosMinistros.length > MAX_VOTOS) {
      alert('Número maximo de votos atingido! Maximo: ' + MAX_VOTOS);
      return false;
    }

    if (!this.votosDosMinistros.some(ministro => ministro.relator)) {
      alert('Não há relatores selecionados!');
      return false;
    }

    return true;
  }

  finalizar(): void {
    if (this.isSelecoesValidas()) {
      console.table(this.formVotacao.value);
    }
  }

}
