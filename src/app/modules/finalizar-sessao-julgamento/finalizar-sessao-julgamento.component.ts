import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MinistroService } from '../services/ministro.service';

@Component({
  selector: 'app-finalizar-sessao-julgamento',
  templateUrl: './finalizar-sessao-julgamento.component.html',
  styleUrls: ['./finalizar-sessao-julgamento.component.scss']
})
export class FinalizarSessaoJulgamentoComponent implements OnInit {

  constructor(private _ministroService: MinistroService) { }

  presidente = "Dias Tofolli"
  primeiraTurma = ["Marco Aurélio", "Carmém Lúcia", "Alexandre de Moraes"]
  segundaTurma = ["Marco Aurélio", "Carmém Lúcia", "Alexandre de Moraes"]
  secretario = new FormControl('', [Validators.required]);
  outrosPresente = new FormControl('');
  cabecalho = new FormControl('');

  ministros;

  ngOnInit(): void {
    this._ministroService.listarMinistros().subscribe(ministros=>{
      this.ministros = ministros;
    })
  }

  getErrorMessage() {
    return this.secretario.hasError('required') ? 'Informe o secretário ou secretária da sessão' : '';
  }

  recuperarImagem(nome: string){
    let url = '';
    if(this.ministros){
      let ministro = this.ministros.find(ministro=>ministro.nome==nome);
      if(ministro) url = ministro.imagem;
    }
    return url
  }
}
