import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Envolvido } from 'app/modules/acervo/model/interfaces/capitulo.interface';
import { PublicacaoDto } from 'app/modules/acervo/model/interfaces/publicacaoDto.interface';
import { publicacao } from 'app/mock-api/pautas/publicacoes/data';
import { RevisaoInteiroTeor } from '../revisar-inteiro-teor.component';
import { DocumentoInteiroTeor } from 'app/modules/acervo/model/interfaces/documento-inteiro-teor.interface';

@Component({
  selector: 'app-conteudo-publicacao',
  templateUrl: './conteudo-publicacao.component.html',
  styleUrls: ['./conteudo-publicacao.component.scss']
})
export class ConteudoPublicacaoComponent implements OnInit, AfterViewInit {

  publicacao: PublicacaoDto = publicacao[0];
  link: SafeResourceUrl;

  fragment: string;

  documentos: DocumentoInteiroTeor[];

  @Input() revisao: RevisaoInteiroTeor;

  constructor(
    private _sanitizer: DomSanitizer,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.link = this._sanitizer.bypassSecurityTrustResourceUrl('');

    this._route.fragment.subscribe(fragment => { this.fragment = fragment; });

    this.documentos = this.revisao?.documentos?.filter((documento) => documento.documento.status !== "Removido");
  }

  ngAfterViewInit(): void {
    try {
      document.getElementById(this.fragment)?.scrollIntoView();
    } catch (e) {
      console.log(e);
    }
  }

  atualizarRevisao(revisao: RevisaoInteiroTeor) {
      this.revisao = revisao;

      this.documentos = this.revisao.documentos.filter((documento) => documento.documento.status !== "Removido");
  }

  public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
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
    //   this._publicacaoService.abrirPeca(publicacao.id).subscribe(url=>{
    //     this.link = this._sanitizer.bypassSecurityTrustResourceUrl(url);
    //     window.open(this.link['changingThisBreaksApplicationSecurity'], "_blank");
    //   });
  }

}
