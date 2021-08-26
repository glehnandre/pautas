import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Colegiado, ComposicaoColegiado } from '../acervo/model/interfaces/colegiado.interface';
import { Documento } from '../acervo/model/interfaces/documento.interface';
import { Ministro } from '../acervo/model/interfaces/ministro.interface';
import { Tag } from '../acervo/model/interfaces/tag.interface';
import { MinistroService } from '../services/ministro.service';
import { ProcessoService } from '../services/processo.service';

@Component({
  selector: 'app-criacao-colegiado',
  templateUrl: './criacao-colegiado.component.html',
  styleUrls: ['./criacao-colegiado.component.scss']
})
export class CriacaoColegiadoComponent implements OnInit {

  panelOpenState: boolean = false;

  queryParams: {
    processo: string,
    data: string,
    colegiado: string,
    sessao: string,
  };
  formVotacao: FormGroup;
  ministros: Ministro[] = [];
  colegiados: Colegiado[] = [];
  composicao: ComposicaoColegiado[] = [];
  votosDosMinistros: ComposicaoColegiado[] = [];
  relator: Ministro;
  tags: string[] = [];
  documentos: string[] = [];

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
    private _processoService: ProcessoService,
    private _route: ActivatedRoute,
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
    this._route.queryParams.subscribe((data) => {
      this.queryParams = {
        colegiado: data.colegiado,
        data: data.data,
        processo: data.processo,
        sessao: data.sessao,
      };

      this._ministroService.listarColegiados(this.queryParams.colegiado).subscribe({
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
    });

    this._processoService.obterDocumentosDoProcesso(1).subscribe(data=>{
      data.forEach(documento=>{
        this.documentos.push(documento.nome);
      })
    })
    this._processoService.recuperarTagsDaApi().subscribe(data=>{
      data.forEach(tag=>{
        this.tags.push(tag.descricao);
      })
    })
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

    if (this.votosDosMinistros.length === 0) {
      alert('Nunhum voto selecionado!');
      return false;
    }

    if (this.votosDosMinistros.length < MIN_VOTOS) {
      alert('Número minimo de votos: ' + MIN_VOTOS);
      return false;
    }

    if (!this.votosDosMinistros.some(ministro => ministro.relator)) {
      alert('Não há relatores selecionados!');
      return false;
    }

    return true;
  }

  calcularContador(): number {
    const MAX: number = 5;
    const sub =( MAX - this.votosDosMinistros.length);
    return (sub >= 0) ? sub : 0;
  }

  finalizar(): void {
    if (this.isSelecoesValidas()) {
      console.table(this.formVotacao.value);
      this._ministroService.criarColegiado(this.formVotacao.value).subscribe({
        next: (data) => {
          console.log(data);
        }
      });
    }
  }
}
