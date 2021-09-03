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
      filtros: this.filtros.termo,
      primeira_turma: [this.filtros.primeira_turma],
      segunda_turma: [this.filtros.segunda_turma],
      pleno: [this.filtros.pleno],
      tipos: [this.filtros.tipos],
      categorias: [this.filtros.categorias],
      modalidades: [this.filtros.modalidades]
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
}
