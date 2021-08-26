import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filtros } from './filtros';

@Component({
  selector: 'filtro-dialog.component',
  templateUrl: 'filtro-dialog.component.html',
})
export class FiltroDialogComponent implements OnInit {

  form: FormGroup;
  filtros: Filtros;
  tiposLista: string[] = ['ORDINARIA'];
  categoriasLista: string[] = ['REPERCUSSAO_GERAL'];
  modalidadesLista: string[] = ['VIRTUAL'];
  /**
   *
   * @param dialogRef Referencia para a caixa de dialogo
   * @param fb instancia do formulario
   * @param data data injetada com a chave de pesquisa vinda do input text
   */
  constructor(
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

  }

  fechar(): void {
    this.dialogRef.close(this.filtros);
  }

  filtrar() {
    this.dialogRef.close(Object.assign(this.filtros, this.form.value));
  }
}
