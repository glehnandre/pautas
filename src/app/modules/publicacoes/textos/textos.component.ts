import { Component, OnInit } from '@angular/core';
import { Envolvido } from 'app/modules/acervo/model/interfaces/envolvido.interface';
import { PublicacaoService } from 'app/modules/services/publicacao.service';

@Component({
  selector: 'app-textos',
  templateUrl: './textos.component.html',
  styleUrls: ['./textos.component.scss']
})
export class TextosComponent implements OnInit {

  envolvidosL: Envolvido[] = [];
  envolvidosR: Envolvido[] = [];

  constructor(
    private _publicacaoService: PublicacaoService,
  ) { }

  ngOnInit(): void {
    this._publicacaoService.listarPublicacoes().subscribe(publicacao=>{
      publicacao[0].envolvidos.forEach(envolvido=>{
          if(envolvido.polo == 'ATIVO') this.envolvidosL.push(envolvido);
          else this.envolvidosR.push(envolvido);
      });
    })
  }
  
  teste(a){
    console.log(a);
    
  }

}
