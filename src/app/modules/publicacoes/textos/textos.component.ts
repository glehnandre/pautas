import { DatePipe, registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertaService } from 'app/modules/services/alerta.service';
import { PublicacaoService } from 'app/modules/services/publicacao.service';
import { Envolvido } from 'app/shared/model/interfaces/capitulo.interface';
import { PublicacaoDto } from 'app/shared/model/interfaces/publicacaoDto.interface';
registerLocaleData(localePT);

@Component({
  selector: 'digital-textos',
  templateUrl: './textos.component.html',
  styleUrls: ['./textos.component.scss']
})
export class TextosComponent implements OnInit, AfterContentChecked {

  @Input() filtrados: PublicacaoDto[] = [];

  publicacoes: PublicacaoDto[];
  link: SafeResourceUrl;
  
  errorMessage: string;

  constructor(
    private _sanitizer: DomSanitizer,
    private _publicacaoService: PublicacaoService,
    private _alertaService: AlertaService,
  ) { }

  ngOnInit(): void {
    this.link = this._sanitizer.bypassSecurityTrustResourceUrl('');
  }

  ngAfterContentChecked(): void {
    this.publicacoes = this.filtrados;
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
    (firstDate) ? data = newDate.getDate()+1+'/'+meses[newDate.getMonth()]+'/'+newDate.getFullYear().toString().slice(2,4) 
                : data = datepipe.transform(isoDate, "dd/MM/YYYY hh:mm");
    return data;
  }

  /**
   * Abre o link do pdf da publicação para ser baixado
   */
  abrirLink(publicacao: PublicacaoDto): void {
      this._publicacaoService.abrirPeca(publicacao.id).subscribe({
        next: (url) => {
          this.link = this._sanitizer.bypassSecurityTrustResourceUrl(url);
          window.open(this.link['changingThisBreaksApplicationSecurity'], "_blank");
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = error.message
          this._alertaService.exibirAlerta("Error");
        }
      });
  }
}
