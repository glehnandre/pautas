import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseDrawerService } from '@fuse/components/drawer';
import { Colegiado, ComposicaoColegiado } from '../acervo/model/interfaces/colegiado.interface';
import { Ministro } from '../acervo/model/interfaces/ministro.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { AlertaService } from '../services/alerta.service';
import { MinistroService } from '../services/ministro.service';
import { ProcessoService } from '../services/processo.service';

@Component({
  selector: 'app-criacao-colegiado',
  templateUrl: './criacao-colegiado.component.html',
  styleUrls: ['./criacao-colegiado.component.scss'],
})
export class CriacaoColegiadoComponent implements OnInit {

  panelOpenState: boolean = false;

  queryParams: {
    processo: number,
    data: string,
    colegiado: string,
    sessao: string,
  };

  alerta: {
    titulo: string;
    mensagem: string;
  };

  processo: Processo = {} as Processo;
  formVotacao: FormGroup;
  ministros: Ministro[] = [];
  colegiados: Colegiado[] = [];
  composicao: ComposicaoColegiado[] = [];
  votosDosMinistros: ComposicaoColegiado[] = [];
  relator: Ministro;
  tags: string[] = [];
  lastId: string = 'idTags';
  documentos: {
    nomes: string[],
    links: string[],
  }

  constructor(
    private _fb: FormBuilder,
    private _ministroService: MinistroService,
    private _route: ActivatedRoute,
    private _alertaService: AlertaService,
    private _processoService: ProcessoService,
  ) { 
    this.formVotacao = this._fb.group({
      processo: ['', Validators.required],
      anoSessao: ['', Validators.required],
      numeroSessao: ['', Validators.required],
      julgados: [this.votosDosMinistros],
    });
  }

  ngOnInit(): void {
    const { colegiado, data, processo, sessao } = this._route.snapshot.queryParams;

    this.queryParams = {
      colegiado,
      data,
      processo,
      sessao,
    };
    this._processoService.listarProcessos().subscribe(processos=>{
      this.processo = processos.find(processo => processo.id == this.queryParams.processo);
    })

    this.formVotacao.setValue({
      processo,
      numeroSessao: sessao.slice(0, sessao.indexOf('-')),
      anoSessao: sessao.slice(sessao.indexOf('-')+1, sessao.length),
      julgados: this.votosDosMinistros,
    });

    this._ministroService.listarColegiados(this.queryParams.colegiado).subscribe({
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
  }

  isSelecoesValidas(): boolean {
    const MIN_VOTOS: number = 5;

    if (this.votosDosMinistros.length === 0) {
      this._exibeAlerta('Erro ao verificar votos', 'Nunhum ministro est?? participando da vota????o!');
      return false;
    }

    if (this.votosDosMinistros.length < MIN_VOTOS) {
      this._exibeAlerta('Erro na qunatidade de votos', `O n??mero m??nimo de votos ?? ${MIN_VOTOS}`);
      return false;
    }

    if (!this.votosDosMinistros.some(ministro => ministro.relator)) {
      this._exibeAlerta('Erro ao verificar relator', 'Adicione algum relator para participar do colegiado');
      return false;
    }

    return true;
  }

  calcularContador(): number {
    const MAX: number = 5;
    const sub =( MAX - this.votosDosMinistros.length);
    return (sub >= 0) ? sub : 0;
  }

  isMinistroParticipadandoDaVotacao(colegiado: ComposicaoColegiado): boolean {
    if (this.calcularContador() === 0) {
      const index = this.votosDosMinistros
        .findIndex(voto => voto.ministro.id === colegiado.ministro.id);
      return (index === -1);
    } else {
      return false;
    }
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

  setId(id: string): void{
    this.lastId = id;
  }

  private _exibeAlerta(titulo: string, mensagem: string): void {
    this.alerta = { titulo, mensagem };
    this._alertaService.exibirAlertaDeErro('alertaDeErroNoColegiado');
  }

}
