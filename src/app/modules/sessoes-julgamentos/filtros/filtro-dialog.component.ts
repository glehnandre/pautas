import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SituacaoDoProcesso } from 'app/modules/acervo/model/enums/situacaoDoProcesso.enum';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { ProcessoService } from 'app/modules/services/processo.service';
import { Filtros } from './filtros';

@Component({
  selector: 'filtro-dialog.component',
  templateUrl: 'filtro-dialog.component.html',
})
export class FiltroDialogComponent implements OnInit {

  lista: string[] = [];
  panelOpenState: boolean = false;
  Selected = false;
  imagens: string[] = [];
  ministros: Ministro[] = [];
  classes: string[] = [];
  temas: string[] = ["Tema 1", "Tema 2", "Tema 3", "Tema 4", "Tema 5", "Tema 6"]

  filtrosEscolhidos: string[] = [];
  listaEscolhida: string[] = [];
  ministroEscolhido: Ministro[] = [];
  classeEscolhida: string[] = [];
  temaEscolhida: string[] = []

  processos: Processo[] = [];
  form: FormGroup;
  filtros: Filtros;
  tiposLista: string[] = ['ORDINARIA'];
  categoriasLista: string[] = ['REPERCUSSAO_GERAL'];
  modalidadesLista: string[] = ['VIRTUAL'];
  /**
   *
   * @param _processoService instancia dos servicos dos Processos
   * @param dialogRef Referencia para a caixa de dialogo
   * @param fb instancia do formulario
   * @param data data injetada com a chave de pesquisa vinda do input text
   */
  constructor(
    private _processoService: ProcessoService,
    public dialogRef: MatDialogRef<FiltroDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.filtros = data.filtros;
  }

  /**
   * Inicializa formulários
   */

  ngOnInit(): void {
    this.form = this.fb.group({
      termos: this.filtros.termos,
      relatoria: [this.filtros.relatoria],
      listas: [this.filtros.listas],
      temas: [this.filtros.temas],
      classes: [this.filtros.classes],
    });

    this._processoService.listarProcessos().subscribe(data=>{
      data.forEach(processo=>{
        if(processo.situacao==SituacaoDoProcesso.Pautado){
          if(processo.redator)this.ministros.push(processo.redator);
          else if(processo.relator)this.ministros.push(processo.relator);
          if(this.classes.indexOf(processo.classe)==-1){
            this.classes.push(processo.classe);
          }
          this.processos.push(processo);
          processo.lista.forEach(lista=>{
            this.lista.push(lista.descricao);
          })
        }
      })
    })
  }

  fechar(): void {
    this.dialogRef.close(this.filtros);
  }

  filtrar() {
    this.dialogRef.close(Object.assign(this.filtros, this.form.value));
  }

  atualizaForm(form){
    
    const name = form.conteudo.source.name;
    const status = form.conteudo.checked;
    const value = form.conteudo.source.value;

    if(name=="Relatoria"){

      if(status==true) this.ministroEscolhido.push(value);
      else this.ministroEscolhido.splice(this.ministroEscolhido.indexOf(value), 1);

      this.form.patchValue({relatoria: this.ministroEscolhido})
    }
    else if(name=="Listas"){

      if(status==true) this.listaEscolhida.push(value);
      else this.listaEscolhida.splice(this.listaEscolhida.indexOf(value), 1);

      this.form.patchValue({listas: this.listaEscolhida})
    }
    else if(name=="Temas"){

      if(status==true) this.temaEscolhida.push(value);
      else this.temaEscolhida.splice(this.temaEscolhida.indexOf(value), 1);

      this.form.patchValue({temas: this.temaEscolhida})
    }
    else if(name=="Classe Processual"){

      if(status==true) this.classeEscolhida.push(value);
      else this.classeEscolhida.splice(this.classeEscolhida.indexOf(value), 1);

      this.form.patchValue({classes: this.classeEscolhida})
    }

    if(status==true) this.filtrosEscolhidos.push(value);
    else this.filtrosEscolhidos.splice(this.filtrosEscolhidos.indexOf(value), 1);

    this.form.patchValue({termos: this.filtrosEscolhidos})
  }
}
