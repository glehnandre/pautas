import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alerta } from 'app/shared/alerta/alerta.component';
import { Classe } from 'app/shared/model/interfaces/classe.interface';
import { Dispositivo } from 'app/shared/model/interfaces/dispositivo.interface';
import { ModeloDecisao } from 'app/shared/model/interfaces/modeloDecisao.interface';
import { TipoRecursoDto } from 'app/shared/model/interfaces/tipoRecursoDto';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertaService } from '../../services/alerta.service';
import { ClasseService } from '../../services/classe.service';
import { DispositivoService } from '../../services/dispositivo.service';
import { ProcessoService } from '../../services/processo.service';
import { RecursoService } from '../../services/recurso.service';




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
  recursos$: Observable<TipoRecursoDto[]>;
  classes$: Observable<Classe[]>;
  modelo: ModeloDecisao = { id: 0 } as ModeloDecisao;
  linhaAtualDoTexto: number = 1;
  exibirSugestoes: boolean = false;
  
  alerta: Alerta = {} as Alerta;

  constructor(
    private _fb: FormBuilder,
    private _alertaService: AlertaService,
    private _processoService: ProcessoService,
    private _dispositivoService: DispositivoService,
    private _recursoService: RecursoService,
    private _classeService: ClasseService,
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
    this.classes$ = this._classeService.getClasses().pipe(
      catchError((error) => {
        console.log(error);
        this.alerta = {
          nome: "Error", 
          tipo: "error", 
          titulo: "Erro",
          mensagem: error.message
        }
        this._alertaService.exibirAlerta("Error")
        return EMPTY;
      }),
    );
    this.recursos$ = this._recursoService.obterListaDeRecursos().pipe(
      catchError(error => {
        console.log(error);
        this.alerta = {
          nome: "Error", 
          tipo: "error", 
          titulo: "Erro",
          mensagem: error.message
        }
        this._alertaService.exibirAlerta("Error")
        return EMPTY;
      })
    );

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
      },
      error: (error) => {
        console.log(error);
        this.alerta = {
          nome: "Error", 
          tipo: "error", 
          titulo: "Erro",
          mensagem: error.message
        }
        this._alertaService.exibirAlerta("Error");
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
      this._processoService.obterModeloDecisao(classe, tipoCapitulo, dispositivo, recurso)
        .pipe(
          catchError(() => {
            this.modelo = { id: 0 } as ModeloDecisao;
            this.formModeloDecisao.controls.texto.setValue('');
            this.alerta = {
              nome: "aviso-form-modelo-decisao", 
              tipo: "warning", 
              titulo: "Aviso",
              mensagem: "Não foi encontrando nenhum modelo de decisão com estes parâmetros."
            }
            this._alertaService.exibirAlerta('aviso-form-modelo-decisao');
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

  /**
   * @description Este método faz o processo de tratamento dos atributos do Formulário
   *              antes dele se retornado para a página `Resultado Julgamento`,
   *              retornando para esta página o modelo, nome do dispositivo e nome do
   *              recurso.
   + @author Rodrigo Carvalho dos Santos
   */
  private sairModal(): void {
    const modelo = this.formModeloDecisao.value;
    const dispositivo = this.dispositivos.find(({ id }) => id == modelo.dispositivo).nome;
    let recurso;
    this.recursos$.subscribe(recursos => {
        recurso = recursos.find(({ id }) => id == modelo.recurso).descricao;
    });
    this.dialogRef.close({ modelo, dispositivo, recurso });
  }

  public salvarModeloDecisao(): void {
    if (this.formModeloDecisao.valid) {
      if(this.modelo.id == 0){
        this._processoService.salvarModeloDecisao(this.formModeloDecisao.value).subscribe({
          next: (modelo) => {
            this.modelo = modelo;
            this._alertaService.exibirAlerta('sucesso-form-modelo-decisao');
            this.sairModal();
          },
          error: (error) => {
            console.log(error);
            this.alerta = {
              nome: "Error", 
              tipo: "error", 
              titulo: "Erro",
              mensagem: error.message
            }
            this._alertaService.exibirAlerta("Error");
          }
        });
      }else{
        this._processoService.atualizarModeloDecisao(this.modelo.id, this.formModeloDecisao.value).subscribe({
          next: (modelo) => {
            this.modelo = modelo;
            this.sairModal();
          },
          error: (error) => {
            console.log(error);
            this.alerta = {
              nome: "Error", 
              tipo: "error", 
              titulo: "Erro",
              mensagem: error.message
            }
            this._alertaService.exibirAlerta("Error");
          }
        });
      }

    }
  }

  public adicionarSugestaoAoTexto(sugestao: string): void {
    let texto = this.formModeloDecisao.controls.texto.value;
    let textoComSugestao = `${texto}${sugestao}`;

    this.formModeloDecisao.controls.texto.setValue(textoComSugestao);
  }

}
