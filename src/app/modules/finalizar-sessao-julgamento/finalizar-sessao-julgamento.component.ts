import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Ministro } from '../acervo/model/interfaces/ministro.interface';
import { MinistroService } from '../services/ministro.service';
import { JulgamentoService } from '../services/julgamento.service';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { DatePipe } from '@angular/common';
import { MatCheckboxChange } from '@angular/material/checkbox';
registerLocaleData(localePT);

interface presienteChecked {
  nome: string;
  checked: boolean;
}

@Component({
  selector: 'app-finalizar-sessao-julgamento',
  templateUrl: './finalizar-sessao-julgamento.component.html',
  styleUrls: ['./finalizar-sessao-julgamento.component.scss']
})

export class FinalizarSessaoJulgamentoComponent implements OnInit {

  constructor(
    private _ministroService: MinistroService,
    private _julgamentoService: JulgamentoService
  ) { }

  presienteChecked: presienteChecked[] = [];

  presidente: Ministro = {} as Ministro;
  primeiraTurma: Ministro[] = []
  segundaTurma: Ministro[] = []
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  secretario = new FormControl('', [Validators.required], );
  outrosPresente = new FormControl('');
  cabecalho = new FormControl('');
  sessao: SessaoJulgamento = {} as SessaoJulgamento;

  ministros: Ministro[] = [];

  ngOnInit(): void {
    this._julgamentoService.listarSessoesDeJulgamento(1000,2021).subscribe(sessao=>{
      this.options.push(sessao.secretario.nome);
      this.sessao = sessao;
      this.presidente = sessao.presidencia;
      this.presienteChecked.push({nome: sessao.presidencia.nome, checked: false})
    })
    this._ministroService.listarMinistros().subscribe(ministros=>{
      this.ministros = ministros;
    })
    this._ministroService.listarMinistrosDoColegiado('primeira-turma').subscribe(ministros=>{
      this.primeiraTurma = ministros;
      ministros.forEach(ministro=>this.presienteChecked.push({nome: ministro.nome, checked: false}));
    })
    this._ministroService.listarMinistrosDoColegiado('segunda-turma').subscribe(ministros=>{
      this.segundaTurma = ministros;
      ministros.forEach(ministro=>this.presienteChecked.push({nome: ministro.nome, checked: false}));
    })
    
    this.filteredOptions = this.secretario.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getErrorMessage() {
    return this.secretario.hasError('required') ? 'Informe o secretário ou secretária da sessão' : '';
  }

  getData(): string{
    const datepipe: DatePipe = new DatePipe('pt-BR');
    let inicio = '', fim = '', dataInicio, dataFim, semanaInicio = '', semanaFim = '';
      inicio = datepipe.transform(this.sessao.data_inicio, 'dd/MM,EEEE');
      if(inicio){
        dataInicio = inicio.split(',')[0];
        semanaInicio = inicio.split(',')[1].split('-')[0];
        semanaInicio = this.firstToUpperCase(semanaInicio);
      }
      fim = datepipe.transform(this.sessao.data_fim, 'dd/MM,EEEE');
      if(fim){
        dataFim = fim.split(',')[0];
        semanaFim = fim.split(',')[1].split('-')[0];
        semanaFim = this.firstToUpperCase(semanaFim);
      }

    return `${semanaInicio} (${dataInicio}) - ${semanaFim} (${dataFim})`;
  }

  firstToUpperCase(str: string){
    if(str){
    str = str.toLowerCase();
    return str[0].toUpperCase() + str.substr(1);
    }
  }

  isChecked(nome: string): boolean{
    const presidente = this.presienteChecked.find(presidente=>presidente.nome==nome);
    if(presidente) return presidente.checked;
    return false;
  }

  checked(event: MatCheckboxChange){
    this.presienteChecked.forEach(presidente=>{
      if(event.source.name == presidente.nome) presidente.checked = event.checked;
      else presidente.checked = false;
    })
  }

}
