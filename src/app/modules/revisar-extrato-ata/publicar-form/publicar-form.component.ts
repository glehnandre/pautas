import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { MinistroService } from 'app/modules/services/ministro.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-publicar-form',
  templateUrl: './publicar-form.component.html',
  styleUrls: ['./publicar-form.component.scss']
})

export class PublicarFormComponent implements OnInit {

  ministros: Observable<Ministro[]>;
  formPublicacao: FormGroup;
  ministrospresentes: Set<Ministro> = new Set();
  opcoesDataPublicacao = [
      { value: 1, view: 'Publicar Automaticamente' },
      { value: 2, view: 'Publicar na Próxima Sessão' },
      { value: 3, view: 'Publicar em uma Data' }
    ]

  constructor(
    private _ministroService: MinistroService,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {}

  ngOnInit(): void {
    this.formPublicacao = this._formBuilder.group({
      presentes: [[], Validators.required],
      presidente: ['', Validators.required],
      acessor: ['', Validators.required],
      data: ['', Validators.required]
    })
    this.ministros = this._ministroService.listarMinistros();
  }

  salvar(): void {
    console.log(this.ministrospresentes);
  }
}
