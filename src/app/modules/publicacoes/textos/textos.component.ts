import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Envolvido } from 'app/modules/acervo/model/interfaces/envolvido.interface';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { Publicacao } from 'app/modules/acervo/model/interfaces/publicacao.interface';
import { MinistroService } from 'app/modules/services/ministro.service';
import { PublicacaoService } from 'app/modules/services/publicacao.service';
import moment from 'moment';

@Component({
  selector: 'app-textos',
  templateUrl: './textos.component.html',
  styleUrls: ['./textos.component.scss']
})
export class TextosComponent implements OnInit {

  publicacoes: Publicacao[] = [];
  ministros: Ministro[] = [];

  constructor(
    private _publicacaoService: PublicacaoService,
    private _ministroService: MinistroService,
  ) { }

  ngOnInit(): void {
    this._publicacaoService.listarPublicacoes().subscribe(publicacao=>{
      this.publicacoes = publicacao;
      this.getData(publicacao[0].divulgacao);
    })
    this._ministroService.listarMinistros().subscribe(ministros=> {
      this.ministros = ministros;
    });
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
   */
  getData(data: string): string{
    const now = moment(new Date());
    const past = moment(data);
    const duration = moment.duration(now.diff(past));
    if(duration.asMonths()>12) return `Há ${duration.asYears().toFixed(1)} anos`;
    if(duration.asDays()>31) return `Há ${duration.asMonths().toFixed()} meses`;
    if(duration.asHours()>24) return `Há ${duration.asDays().toFixed()} dias`;
    if(duration.asMinutes()>59) return `Há ${duration.asHours().toFixed()} horas`;
    return `Há ${duration.asMinutes().toFixed()} minutos`;
  }

  /**
   *
   * @param relator relator da publicação. Ex: "Ministro Luiz Fux"
   */
  getImagemMinistro(relator: string){
    const nome: string = relator.split(" ")[1]+" "+relator.split(" ")[2];
    let ministro = this.ministros.find(ministro=>ministro.nome==nome);
    if(ministro) return ministro?.imagem;
    return "assets/images/avatars/simbolo-justica.jpg";
  }

}
