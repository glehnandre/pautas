
import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filtros } from './filtros';
import { tags as tagData } from 'app/mock-api/pautas/tags/data';
import { Tag } from 'app/modules/acervo/model/interfaces/tag.interface';


@Component({
  selector: 'filtro-dialog.component',
  templateUrl: 'filtro-dialog.component.html',
})
export class FiltroDialogComponent implements OnInit {

  form: FormGroup;
  filtros: Filtros;
  classesLista: string[] = ['AC', 'ACO', 'ADC', 'ADI', 'ADO', 'ADPF', 'AI', 'AImp', 'AO', 'AOE', 'AP', 'AR', 'ARE', 'AS', 'CC', 'Cm', 'EI', 'EL', 'EP', 'Ext', 'HC', 'HD', 'IF', 'Inq', 'MI', 'MS', 'Pet', 'PPE', 'PSV', 'C', 'Rcl', 'RE', 'RHC', 'RHD', 'RMI', 'RMS', 'RvC', 'SIRDR', 'SL', 'SS', 'STA', 'STP', 'TPA'];
  situacaoLista: string[] = ['Apto a Julgar', 'Pautado', 'Retirado de pauta', 'Solicitada sessão extraordinária', 'Em julgamento', 'Julgado', 'Suspenso', 'Vista', 'Retonado de vista']
  tags: Tag[] = tagData;
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
    this.tags = tagData;
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
      classes: [this.filtros.classes],
      tags: [this.filtros.tags],
      situacoes: [this.filtros.situacoes]
    });

  }

  fechar(): void {
    this.dialogRef.close(this.filtros);
  }

  filtrar() {
    this.dialogRef.close(Object.assign(this.filtros, this.form.value));
  }
}