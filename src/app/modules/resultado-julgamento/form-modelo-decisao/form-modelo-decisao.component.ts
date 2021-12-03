import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { FuseAlertService } from '@fuse/components/alert';
import { Dispositivo } from 'app/modules/acervo/model/interfaces/dispositivo.interface';
import { ModeloDecisao } from 'app/modules/acervo/model/interfaces/modeloDecisao.interface';
import { TipoRecursoDto } from 'app/modules/acervo/model/interfaces/tipoRecursoDto';
import { DispositivoService } from 'app/modules/services/dispositivo.service';
import { RecursoService } from 'app/modules/services/recurso.service';
import { ResultadoJulgamentoService } from 'app/modules/services/resultado-julgamento.service';
import { EMPTY, Observable, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  readonly tiposCapitulo: string[] = [ 'Mérito', 'Preliminar', 'Modulação', 'Questão de Ordem', 'Tese' ];
  readonly atributos: string[] = ['colegiado', 'processo', 'sessao', 'data_inicio_sessao', 'data_fim_sessao', 'modalidade', 'tipo'];

  formModeloDecisao: FormGroup;
  dispositivos: Dispositivo[];
  recursos$: Observable<TipoRecursoDto>;
  modelo: ModeloDecisao = {
    id: 0,
    classe: '',
    dispositivo: null,
    recurso: 0,
    texto: '',
    tipoCapitulo: null,
  };
  linhaAtualDoTexto: number = 1;
  exibirSugestoes: boolean = false;
  exibirAlerta: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _resultadoJulgamento: ResultadoJulgamentoService,
    private _dispositivoService: DispositivoService,
    private _recursoService: RecursoService,
    private _fuseAlertService: FuseAlertService,
    public dialogRef: MatDialogRef<FormModeloDecisaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModeloDecisaoData,
  ) { 
    this.formModeloDecisao = this._fb.group({
      id:               [this.modelo.id],
      classe:           [this.modelo.classe,        Validators.required],
      tipoCapitulo:     [this.modelo.tipoCapitulo,  Validators.required],
      recurso:          [this.modelo.recurso,       Validators.required],
      texto:            [this.modelo.texto,         Validators.required],
      dispositivo:      [this.modelo.dispositivo,   Validators.required],
    });
  }

  ngOnInit(): void {
    this.recursos$ = this._recursoService.obterListaDeRecursos();

    this.formModeloDecisao.controls.texto.valueChanges.subscribe((texto: string) => {
      this.exibirSugestoes = false;
      if (texto.endsWith('@')) {
        this.exibirSugestoes = true;
      }
    });
  }

  public buscarDispositivos(): void {
    this._dispositivoService.obterDispositivos(this.data.processo.id, this.formModeloDecisao.controls.tipoCapitulo.value).subscribe({
      next: (dispositivos) => {
        this.dispositivos = dispositivos;
      }
    });
  }

  public carregarModeloDecisao(): void {
    const { 
      classe, 
      dispositivo, 
      recurso, 
      tipoCapitulo, 
    } = this.formModeloDecisao.value;

    if (classe !== '' && tipoCapitulo !== null && dispositivo && recurso > 0) {
      this._resultadoJulgamento.obterModeloDecisao(classe, tipoCapitulo, dispositivo, recurso)
        .pipe(
          catchError(() => {
            this.modelo = {
              id: 0,
              classe: '',
              dispositivo: null,
              recurso: 0,
              texto: '',
              tipoCapitulo: null,
            };
            this.formModeloDecisao.controls.texto.setValue('');
            this.exibirAlerta = true;
            this._fuseAlertService.show('aviso-form-modelo-decisao');          

            setTimeout(() => {
              this._fuseAlertService.dismiss('aviso-form-modelo-decisao');
            }, 5000);

            return EMPTY;
          })
        )
        .subscribe({
          next: (modelo) => {
            this.modelo = modelo;
            this.formModeloDecisao.setValue({ 
              ...modelo, 
              dispositivo: modelo.dispositivo.id,
            });
          },
        });
    }
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

  public adicionarSugestaoAoTexto(sugestao: string): void {
    let texto = this.formModeloDecisao.controls.texto.value;
    let textoComSugestao = `${texto}${sugestao}`;

    this.formModeloDecisao.controls.texto.setValue(textoComSugestao);
  }

}
