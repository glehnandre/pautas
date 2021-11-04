import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Envolvido } from 'app/modules/acervo/model/interfaces/envolvido.interface';
import { PublicacaoDto } from 'app/modules/acervo/model/interfaces/publicacaoDto.interface';
import { PublicacaoService } from 'app/modules/services/publicacao.service';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
registerLocaleData(localePT);

@Component({
  selector: 'app-textos',
  templateUrl: './textos.component.html',
  styleUrls: ['./textos.component.scss']
})
export class TextosComponent implements OnInit {

  @Input() publicacoes: PublicacaoDto[] = [];

  constructor(
  ) { }

  ngOnInit(): void {
  }

  /**
   *
   * @param envolvidos array com todos os envolvidos na publicação para retornar 
   * os envolvidos que ficarão à esquerda.
   */
  envolvidosLeft(envolvidos: Envolvido[]): Envolvido[]{
    let left: Envolvido[] = [];
    envolvidos.forEach(envolvido=>{
      if(envolvido.polo == 'ATIVO') left.push(envolvido);
    });
    
    return left;
  }

  /**
   *
   * @param envolvidos array com todos os envolvidos na publicação para retornar 
   * os envolvidos que ficarão à direita.
   */
  envolvidosRight(envolvidos: Envolvido[]): Envolvido[]{
    let right: Envolvido[] = [];
    envolvidos.forEach(envolvido=>{
      if(envolvido.polo == 'PASSIVO') right.push(envolvido);
    });
    
    return right;
  }

  /**
   *
   * @param data data da publicação
   * @param firstDate indica se sera a data em destaque no card (primeira data que aparece) ou não
   */
  getData(isoDate: string, firstDate?: boolean): string{
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
    const datepipe: DatePipe = new DatePipe('pt-BR')
    let newDate = new Date(isoDate);
    let data: string;
    (firstDate) ? data = newDate.getDate()+'/'+meses[newDate.getMonth()]+'/'+newDate.getFullYear().toString().slice(2,4) 
                   : data = datepipe.transform(isoDate, "dd/MM/YYYY hh:mm");
    return data;
  }
}
