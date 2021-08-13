import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Colegiado } from '../acervo/model/interfaces/colegiado.interface';
import { Ministro } from '../acervo/model/interfaces/ministro.interface';
import { Voto, VotoDoMinistro } from '../acervo/model/interfaces/voto.interface';
import { MinistroService } from '../services/ministro.service';

@Component({
  selector: 'app-criacao-colegiado',
  templateUrl: './criacao-colegiado.component.html',
  styleUrls: ['./criacao-colegiado.component.scss']
})
export class CriacaoColegiadoComponent implements OnInit {

  image = {
      mime: "image/png",
      data: "data:image/png;base64,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"
  }

  formCriacaoColegiado: FormGroup;
  ministros: Ministro[] = [];
  colegiado: Colegiado;

  constructor(
    private _fb: FormBuilder,
    private _ministroService: MinistroService,
  ) { 
    this.formCriacaoColegiado = this._fb.group({
      incluir_voto: [false, [Validators.required]],
      ja_votou: [false, [Validators.required]],
      pode_votar: [false, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._ministroService.listarMinistros().subscribe({
      next: (ministros) => {
        this.ministros = ministros;
        console.log(ministros);
      }
    });

    this._ministroService.listarColegiado().subscribe({
      next: (colegiado) => {
        console.log(colegiado)
        this.colegiado = colegiado;
      }
    });
  }

  obterStatusDoVoto(votoDoMinistro: VotoDoMinistro): void {
    console.table(votoDoMinistro);
  }

  finalizar(): void {
    console.log(this.formCriacaoColegiado.value);
  }

}
