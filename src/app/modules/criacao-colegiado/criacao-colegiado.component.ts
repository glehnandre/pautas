import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
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

  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;
  @ViewChild('widgetsContent1', { read: ElementRef }) public widgetsContent1: ElementRef<any>;

  formVotacao: FormGroup;
  ministros: Ministro[] = [];
  colegiados: Colegiado[] = [];
  votosDosMinistros: ComposicaoColegiado[] = [];
  relator: Ministro;
  texto: string = "Informe os 5 ministros que devem estar no colegiado da Primeira Turma para o processo se podem votar";
  tags: string[] = ["Primeira Turma", "Público", "Liminar", "Lista de 0001 MAM", "Possível Impedimento no Julgamento"];
  pdfs: string[] = ["Relatório", "Íntegra do Voto do Relator", "Voto Divergente"];

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
          c.composicao.map(data => {
            if(data.relator == true){
              this.relator = data.ministro
            }
          })

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

  /**
   * 
   * @param id o id do elemento que eu quero fazer o scrollLeft
   */
  public scrollLeft(id): void {
    let el = document.getElementById(id);
    el.scrollTo({ left: (el.scrollLeft - 150), behavior: 'smooth' });
  }
  public scrollRight(id): void {
    let el = document.getElementById(id);
    document.getElementById(id).scrollTo({ left: (el.scrollLeft + 150), behavior: 'smooth' });
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
