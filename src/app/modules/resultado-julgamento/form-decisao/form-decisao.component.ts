import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-decisao',
  templateUrl: './form-decisao.component.html',
  styleUrls: ['./form-decisao.component.scss']
})
export class FormDecisaoComponent implements OnInit {

  formDecisao: FormGroup;

  @Output() dadosDaDecisao = new EventEmitter<any>();

  constructor(
    private _fb: FormBuilder,
  ) { 
    this.formDecisao = this._fb.group({
      descricao: ['', Validators.required],
      tipo: ['', Validators.required],
      dispositivo: ['', Validators.required],
      ministros_acordam: ['', Validators.required],
      ministro_condutor: ['', Validators.required],
      texto: ['', Validators.required], 
    });
  }

  ngOnInit(): void {
    
  }

  public cadastrarDecisao(): void {
    if (this.formDecisao.valid) {
      this.dadosDaDecisao.emit(this.formDecisao.value);
      this.formDecisao.reset();
    }
  }

}
