import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AlertaService } from 'app/modules/services/alerta.service';
import { MinistroService } from 'app/modules/services/ministro.service';
import { ProcessoService } from 'app/modules/services/processo.service';
import { RecursoService } from 'app/modules/services/recurso.service';
import { Destaque } from 'app/shared/model/interfaces/destaque.interface';
import { Ministro } from 'app/shared/model/interfaces/ministro.interface';
import { Processo } from 'app/shared/model/interfaces/processo.interface';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';
import { TipoRecursoDto } from 'app/shared/model/interfaces/tipoRecursoDto';
import { Vista } from 'app/shared/model/interfaces/vista.interface';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';





interface FormVistaEDestaqueData {
  titulo: string;
  tipo: string;
  dados: any;
}

@Component({
  selector: 'app-form-vista-e-destaque',
  templateUrl: './form-vista-e-destaque.component.html',
  styleUrls: ['./form-vista-e-destaque.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class FormVistaEDestaqueComponent implements OnInit, OnChanges {

  @Input() processo: Processo;
  @Input() vista: Vista;
  @Input() destaque: Destaque;
  @Input() sessao: SessaoDeJulgamento;
  @Output() closeDrawerEmit = new EventEmitter();
  @Output() savedDrawer = new EventEmitter<{vistas: Vista[], destaques: Destaque[]}>();

  formVistaEDestaque: FormGroup;
  ministros$: Observable<Ministro[]>;
  recursos$: Observable<TipoRecursoDto[]>;

  errorMessage: string;

  constructor(
    private _fb: FormBuilder,
    private _ministroService: MinistroService,
    private _recursoService: RecursoService,
    private _processoService: ProcessoService,
    private _alertaService: AlertaService,
  ) {

  }

  ngOnInit(): void {
    this.ministros$ = this._ministroService.listarMinistros().pipe(
      catchError(error => {
        console.log(error);
        this.errorMessage = error.message;
        this._alertaService.exibirAlerta("Error")
        return EMPTY;
      })
    );
    this.recursos$ = this._recursoService.obterListaDeRecursos().pipe(
      catchError(error => {
        console.log(error);
        this.errorMessage = error.message;
        this._alertaService.exibirAlerta("Error")
        return EMPTY;
      })
    );

    this.formVistaEDestaque = this._fb.group({
      data: [null, Validators.required],
      ministro: [null, Validators.required],
      texto: ['', Validators.required],
    });
  }

  ngOnChanges() {
    if (this.vista != null) {
      this.formVistaEDestaque.setValue({data: this.vista.data, ministro: this.vista.ministro.id, texto: this.vista.texto});
    }else if (this.destaque != null) {
      console.log("Destaque diferente de null")
      console.log(this.destaque)
      this.formVistaEDestaque.setValue({data: this.destaque.data, ministro: this.destaque.ministro.id, texto: this.destaque.texto});
    }
  }

  closeDrawer() {
    this.formVistaEDestaque.reset();
    this.closeDrawerEmit.emit();
  }

  salvar(){
    if(this.vista != undefined){
      this.salvarVista();
    }else if(this.destaque != undefined){
      this.salvarDestaque();
    }else this.closeDrawer();
  }

  private salvarVista(){
        const vista: Vista = {
            ...this.formVistaEDestaque.value,
            processo: this.processo.id,
            sessao: this.sessao.id,
        };
        this._processoService.salvarVistaDoProcesso(this.sessao.numero, this.sessao.ano, this.processo.id, vista).subscribe({
          next: (vistaSalva) => {
            this.savedDrawer.emit({vistas: vistaSalva, destaques: null});
            this.closeDrawer();
          },
          error: (error) => {
            console.log(error);
            this.errorMessage = error.message;
            this._alertaService.exibirAlerta("Error")
          }
        });
  }

  private salvarDestaque(){
        const destaque: Destaque = {
            ...this.formVistaEDestaque.value,
            processo: this.processo.id,
            sessao: this.sessao.id,
        };

        this._processoService.salvarDestaqueDoProcesso(this.sessao.numero, this.sessao.ano, this.processo.id, destaque).subscribe({
          next: (destaqueSalvo) => {
            this.savedDrawer.emit({vistas: null, destaques: destaqueSalvo});
            this.closeDrawer();
          },
          error: (error) => {
            console.log(error);
            this.errorMessage = error.message;
            this._alertaService.exibirAlerta("Error")
          }
        });
  }

}
