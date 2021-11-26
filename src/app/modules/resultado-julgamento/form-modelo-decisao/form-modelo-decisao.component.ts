import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dispositivo } from 'app/modules/acervo/model/interfaces/dispositivo.interface';
import { ModeloDecisao } from 'app/modules/acervo/model/interfaces/modeloDecisao.interface';
import { TipoRecursoDto } from 'app/modules/acervo/model/interfaces/tipoRecursoDto';
import { DispositivoService } from 'app/modules/services/dispositivo.service';
import { RecursoService } from 'app/modules/services/recurso.service';
import { ResultadoJulgamentoService } from 'app/modules/services/resultado-julgamento.service';
import { Observable } from 'rxjs';

interface ModeloDecisaoData {
  processo: {
    id: number;
  },
}

@Component({
  selector: 'app-form-modelo-decisao',
  templateUrl: './form-modelo-decisao.component.html',
  styleUrls: ['./form-modelo-decisao.component.scss']
})
export class FormModeloDecisaoComponent implements OnInit {

  formModeloDecisao: FormGroup;
  dispositivos: Dispositivo[];
  tiposCapitulo: string[] = [ 'Mérito', 'Preliminar', 'Modulação', 'Questão de Ordem', 'Tese' ];
  recursos$: Observable<TipoRecursoDto>;
  modelo: ModeloDecisao = {
    id: 0,
    classe: '',
    dispositivo: null,
    recurso: 0,
    texto: '',
    tipoCapitulo: null,
  };

  constructor(
    private _fb: FormBuilder,
    private _resultadoJulgamento: ResultadoJulgamentoService,
    private _dispositivoService: DispositivoService,
    private _recursoService: RecursoService,
    public dialogRef: MatDialogRef<FormModeloDecisaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModeloDecisaoData,
  ) { 
    this.formModeloDecisao = this._fb.group({
      id:               [this.modelo.id],
      classe:           [this.modelo.classe,        Validators.required],
      tipoCapitulo:    [this.modelo.tipoCapitulo,  Validators.required],
      recurso:          [this.modelo.recurso,       Validators.required],
      texto:            [this.modelo.texto,         Validators.required],
      dispositivo:      [this.modelo.dispositivo,   Validators.required],
    });
  }

  ngOnInit(): void {
    this.recursos$ = this._recursoService.obterListaDeRecursos();
  }

  public buscarDispositivos(): void {
    this._dispositivoService.obterDispositivos(this.data.processo.id, this.formModeloDecisao.controls.tipoCapitulo.value).subscribe({
      next: (dispositivos) => {
        this.dispositivos = dispositivos;
      }
    });
  }

  public carregarModeloDecisaoPeloIdDoDispositivo(id: number): void {
    this._resultadoJulgamento.obterModeloDecisaoPeloId(id).subscribe({
      next: (modelo) => {
        this.modelo = modelo;
        this.formModeloDecisao.setValue({ 
          ...modelo, 
          dispositivo: {
            id: modelo.dispositivo.id,
          } 
        });
      }
    });
  }

  public salvarModeloDecisao(): void {
    if (this.formModeloDecisao.valid) {
      this._resultadoJulgamento.salvarModeloDecisao(this.formModeloDecisao.value).subscribe({
        next: () => {
          this.dialogRef.close();
        }
      });
    }
  }

  public atualizarModeloDecisao(): void {
    if (this.formModeloDecisao.valid) {
      this._resultadoJulgamento.atualizarModeloDecisao(this.modelo.id, this.formModeloDecisao.value).subscribe({
        next: () => {
          this.dialogRef.close(this.formModeloDecisao.value);
        }
      });
    }
  }

}
