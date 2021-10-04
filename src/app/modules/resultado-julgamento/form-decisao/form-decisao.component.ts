import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Decisao } from 'app/modules/acervo/model/interfaces/decisao.interface';

@Component({
  selector: 'app-form-decisao',
  templateUrl: './form-decisao.component.html',
  styleUrls: ['./form-decisao.component.scss']
})
export class FormDecisaoComponent implements OnInit {

  formDecisao: FormGroup;

  @Input() decisao: Decisao = {
    descricao: '',
    tipo: '',
    dispositivo: '',
    ministros_acordam: '',
    ministro_condutor: '',
    texto: '', 
  };

  @Output() decisaoCadastrada = new EventEmitter<Decisao>();
  @Output() decisaoExcluida = new EventEmitter<Decisao>();

  constructor(
    private _fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.formDecisao = this._fb.group({
      descricao: [this.decisao.descricao, Validators.required],
      tipo: [this.decisao.tipo, Validators.required],
      dispositivo: [this.decisao.dispositivo, Validators.required],
      ministros_acordam: [this.decisao.ministros_acordam, Validators.required],
      ministro_condutor: [this.decisao.ministro_condutor, Validators.required],
      texto: [this.decisao.texto, Validators.required], 
    });
  }

  public cadastrarDecisao(): void {
    if (this.formDecisao.valid) {
      this.decisaoCadastrada.emit(this.formDecisao.value);
      this.formDecisao.reset();
    }
  }

  public excluirDecisao(): void {
    if (this.formDecisao.valid) {
      this.decisaoExcluida.emit(this.decisao);
    }
  }

  public salvarDecisao(): void {
    if (this.formDecisao.valid) {
      // salva a decisao
    }
  }

  public isDecisao(): boolean {
    const isVazio = Object.values(this.decisao).every(dec => dec !== '');
    return isVazio;
  }

}
