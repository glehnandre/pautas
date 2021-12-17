import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { DjeDto } from 'app/modules/acervo/model/interfaces/djeDto.interface';
import { dje as djeData, pecas as pecasData } from './data';
import { ata as ataData } from '../decisao/data';

@Injectable({
    providedIn: 'root'
})
export class PublicacaoMockApi {
    private _dje: DjeDto = djeData;
    private _pecas = pecasData;
    private _ata = ataData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this._dje = djeData;
        this._pecas = pecasData;
        this._ata = ataData;
        this.registerHandlers();
    }
    
    registerHandlers(): void {
      this._fuseMockApiService
        .onGet('publicacoes')
        .reply(() => {
          const publicacoes = JSON.parse(sessionStorage.getItem('publicacoes'));
          const agregacoes = JSON.parse(sessionStorage.getItem('agregacoes'));
          sessionStorage.clear();
          if(publicacoes) this._dje.publicacoes = publicacoes;
          if(agregacoes) this._dje.agregacoes = agregacoes;
          return [201, this._dje];
        });

      this._fuseMockApiService
        .onGet('publicacoes/peca/:id')
        .reply(({urlParams}) => {
          const id = Number(urlParams.id);

          let peca = this._pecas.find(peca=>peca.publicacaoId == id);

          return [201, peca.url];
        });

      this._fuseMockApiService
        .onPost('publicar')
        .reply(({request}) => {
          const { body } = request;

          this._ata.capitulos_para_publicacao.forEach(ata=>{
            djeData.publicacoes.push({
              id: ata.processo,
              processo: `${ata.classe} ${ata.numero}`,
              processoId: ata.processo,
              sessao: body.sessao,
              tipo: "Extrato de Ata de Julgamento",
              relator: `Min. ${ata.relator.nome}`,
              divulgacao: body.data,
              publicacao: body.data,
              texto: "<html><head><style>p{margin-top:0pt;margin-bottom:1pt;}span.X392{font-size:9.0pt;font-weight:bold;color:#4f81bd;}span.X394{font-family:'Arial';font-size:20.0pt;}p.X395{margin-top:18.0pt;margin-bottom:10.0pt;}span.X395{font-family:'Arial';font-size:17.0pt;}span.X396{font-family:'Arial';font-size:17.0pt;}p.X397{margin-top:16.0pt;margin-bottom:10.0pt;}span.X397{font-family:'Arial';font-size:15.0pt;}span.X398{font-family:'Arial';font-size:15.0pt;}p.X399{margin-top:16.0pt;margin-bottom:10.0pt;}span.X399{font-family:'Arial';font-size:13.0pt;font-weight:bold;}span.X400{font-family:'Arial';font-size:13.0pt;font-weight:bold;}p.X401{margin-top:16.0pt;margin-bottom:10.0pt;}span.X401{font-family:'Arial';font-size:12.0pt;font-weight:bold;}span.X402{font-family:'Arial';font-size:12.0pt;font-weight:bold;}p.X403{margin-top:16.0pt;margin-bottom:10.0pt;}span.X403{font-family:'Arial';font-size:11.0pt;font-weight:bold;}span.X404{font-family:'Arial';font-size:11.0pt;font-weight:bold;}p.X405{margin-top:16.0pt;margin-bottom:10.0pt;}span.X405{font-family:'Arial';font-size:11.0pt;font-weight:bold;font-style:italic;}span.X406{font-family:'Arial';font-size:11.0pt;font-weight:bold;font-style:italic;}p.X407{margin-top:16.0pt;margin-bottom:10.0pt;}span.X407{font-family:'Arial';font-size:11.0pt;font-style:italic;}span.X408{font-family:'Arial';font-size:11.0pt;font-style:italic;}p.X409{margin-top:16.0pt;margin-bottom:10.0pt;}span.X409{font-family:'Arial';font-size:10.0pt;font-style:italic;}span.X410{font-family:'Arial';font-size:10.0pt;font-style:italic;}p.X411{margin-left:36.0pt;}p.X412{margin-top:0.0pt;margin-bottom:0.0pt;}span.X413{font-size:24.0pt;}span.X414{font-size:12.0pt;}p.X415{margin-left:36.0pt;margin-right:36.0pt;}span.X415{font-style:italic;}span.X416{font-style:italic;}p.X417{margin-left:36.0pt;margin-right:36.0pt;background-color:#f2f2f2;}span.X417{font-style:italic;}span.X418{font-style:italic;}p.X421{margin-bottom:0.0pt;}p.X422{margin-bottom:0.0pt;}p.X423{margin-bottom:0.0pt;}p.X424{margin-bottom:0.0pt;}p.X425{margin-bottom:0.0pt;}p.X426{margin-bottom:0.0pt;}p.X427{margin-bottom:0.0pt;}p.X428{margin-bottom:0.0pt;}p.X429{margin-bottom:0.0pt;}p.X430{margin-bottom:0.0pt;}p.X431{margin-bottom:0.0pt;}p.X432{margin-bottom:0.0pt;}p.X433{margin-bottom:0.0pt;}p.X434{margin-bottom:0.0pt;}p.X435{margin-bottom:0.0pt;}p.X436{margin-bottom:0.0pt;}p.X437{margin-bottom:0.0pt;}p.X438{margin-bottom:0.0pt;}p.X439{margin-bottom:0.0pt;}p.X440{margin-bottom:0.0pt;}p.X441{margin-bottom:0.0pt;}p.X442{margin-bottom:0.0pt;}p.X443{margin-bottom:0.0pt;}p.X444{margin-bottom:0.0pt;}p.X445{margin-bottom:0.0pt;}p.X446{margin-bottom:0.0pt;}p.X447{margin-bottom:0.0pt;}p.X448{margin-bottom:0.0pt;}p.X449{margin-bottom:0.0pt;}p.X450{margin-bottom:0.0pt;}p.X451{margin-bottom:0.0pt;}p.X452{margin-bottom:0.0pt;}p.X453{margin-bottom:0.0pt;}p.X454{margin-bottom:0.0pt;}p.X455{margin-bottom:0.0pt;}p.X456{margin-bottom:0.0pt;}p.X457{margin-bottom:0.0pt;}p.X458{margin-bottom:0.0pt;}p.X459{margin-bottom:0.0pt;}p.X460{margin-bottom:0.0pt;}p.X461{margin-bottom:0.0pt;}p.X462{margin-bottom:0.0pt;}p.X463{margin-bottom:0.0pt;}p.X464{margin-bottom:0.0pt;}p.X465{margin-bottom:0.0pt;}p.X466{margin-bottom:0.0pt;}p.X467{margin-bottom:0.0pt;}p.X468{margin-bottom:0.0pt;}p.X469{margin-bottom:0.0pt;}p.X470{margin-bottom:0.0pt;}p.X471{margin-bottom:0.0pt;}p.X472{margin-bottom:0.0pt;}p.X473{margin-bottom:0.0pt;}p.X474{margin-bottom:0.0pt;}p.X475{margin-bottom:0.0pt;}p.X476{margin-bottom:0.0pt;}p.X477{margin-bottom:0.0pt;}p.X478{margin-bottom:0.0pt;}p.X479{margin-bottom:0.0pt;}p.X480{margin-bottom:0.0pt;}p.X481{margin-bottom:0.0pt;}p.X482{margin-bottom:0.0pt;}p.X483{margin-bottom:0.0pt;}p.X484{margin-bottom:0.0pt;}p.X485{margin-bottom:0.0pt;}p.X486{margin-bottom:0.0pt;}p.X487{margin-bottom:0.0pt;}p.X488{margin-bottom:0.0pt;}p.X489{margin-bottom:0.0pt;}p.X490{margin-bottom:0.0pt;}p.X491{margin-bottom:0.0pt;}p.X492{margin-bottom:0.0pt;}p.X493{margin-bottom:0.0pt;}p.X494{margin-bottom:0.0pt;}p.X495{margin-bottom:0.0pt;}p.X496{margin-bottom:0.0pt;}p.X497{margin-bottom:0.0pt;}p.X498{margin-bottom:0.0pt;}p.X499{margin-bottom:0.0pt;}p.X500{margin-bottom:0.0pt;}p.X501{margin-bottom:0.0pt;}p.X502{margin-bottom:0.0pt;}p.X503{margin-bottom:0.0pt;}p.X504{margin-bottom:0.0pt;}p.X505{margin-bottom:0.0pt;}p.X506{margin-bottom:0.0pt;}p.X507{margin-bottom:0.0pt;}p.X508{margin-bottom:0.0pt;}p.X509{margin-bottom:0.0pt;}p.X510{margin-bottom:0.0pt;}p.X511{margin-bottom:0.0pt;}p.X512{margin-bottom:0.0pt;}p.X513{margin-bottom:0.0pt;}p.X514{margin-bottom:0.0pt;}p.X515{margin-bottom:0.0pt;}p.X516{margin-bottom:0.0pt;}p.X517{margin-bottom:0.0pt;}p.X518{margin-bottom:0.0pt;}p.X519{margin-bottom:0.0pt;}p.X520{margin-bottom:0.0pt;}p.X521{margin-bottom:0.0pt;}p.X522{margin-bottom:0.0pt;}p.X523{margin-bottom:0.0pt;}p.X524{margin-bottom:0.0pt;}p.X525{margin-bottom:0.0pt;}p.X526{margin-bottom:0.0pt;}span.X526{color:#404040;}p.X527{margin-bottom:0.0pt;}span.X527{color:#404040;}p.X528{margin-bottom:0.0pt;}span.X528{color:#404040;}p.X529{margin-bottom:0.0pt;}span.X529{color:#404040;}p.X530{margin-bottom:0.0pt;}span.X530{color:#404040;}p.X531{margin-bottom:0.0pt;}span.X531{color:#404040;}p.X532{margin-bottom:0.0pt;}span.X532{color:#404040;}p.X533{margin-bottom:0.0pt;}span.X533{color:#404040;}p.X534{margin-bottom:0.0pt;}span.X534{color:#404040;}p.X535{margin-bottom:0.0pt;}span.X535{color:#404040;}p.X536{margin-bottom:0.0pt;}span.X536{color:#404040;}p.X537{margin-bottom:0.0pt;}span.X537{color:#404040;}p.X538{margin-bottom:0.0pt;}span.X538{color:#404040;}p.X539{margin-bottom:0.0pt;}span.X539{color:#404040;}p.X540{margin-bottom:0.0pt;}p.X541{margin-bottom:0.0pt;}p.X542{margin-bottom:0.0pt;}p.X543{margin-bottom:0.0pt;}p.X544{margin-bottom:0.0pt;}p.X545{margin-bottom:0.0pt;}p.X546{margin-bottom:0.0pt;}span.X547{color:#0000ff;text-decoration:underline;}p.X548{margin-bottom:2.0pt;}span.X548{font-size:9.0pt;}span.X549{font-size:9.0pt;}p.X551{margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X552{margin-left:14.15pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X553{margin-left:28.35pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X554{margin-left:42.5pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X555{margin-left:56.7pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X556{margin-left:70.85pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X557{margin-left:85.05pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X558{margin-left:99.2pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X559{margin-left:113.4pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X561{text-align:justify;margin-top:0.0pt;margin-bottom:8.0pt;}span.X561{font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;}span.X562{font-size:16.0pt;font-weight:bold;}span.X564{color:#000080;text-decoration:underline;}p.X565{margin-top:0.0pt;margin-bottom:6.0pt;}p.X568{margin-top:12.0pt;margin-bottom:6.0pt;}span.X568{font-family:'Arial';font-size:14.0pt;}p.X569{margin-top:12.0pt;margin-bottom:6.0pt;}span.X569{font-family:'Arial';font-size:14.0pt;}p.X570{text-align:center;}span.X570{font-style:italic;}p.X571{margin-top:6.0pt;margin-bottom:6.0pt;}span.X571{font-size:12.0pt;font-style:italic;}p.X573{margin-left:0.0pt;margin-right:0.0pt;text-indent:0.3pt;margin-bottom:0.0pt;}span.X574{font-weight:bold;}p.X575{text-align:left;}p.X576{text-align:center;}span.X576{font-weight:bold;}p.X577{margin-left:0.0pt;margin-right:0.0pt;text-indent:28.35pt;margin-bottom:0.0pt;}p.X578{margin-left:85.05pt;margin-right:0.0pt;text-indent:28.35pt;}span.X578{font-size:12.0pt;}p.X579{margin-left:113.4pt;margin-right:0.0pt;text-indent:28.35pt;}span.X579{font-size:12.0pt;}p.X580{margin-left:141.75pt;margin-right:0.0pt;text-indent:28.35pt;}span.X580{font-size:12.0pt;}p.X581{margin-left:170.1pt;margin-right:0.0pt;text-indent:28.35pt;}span.X581{font-size:12.0pt;}p.X582{margin-left:198.45pt;margin-right:0.0pt;text-indent:28.35pt;}span.X582{font-size:12.0pt;}p.X583{text-align:center;margin-bottom:0.0pt;}p.X584{margin-left:170.1pt;margin-right:0.0pt;text-indent:0.0pt;}p.X585{text-align:center;}span.X585{font-size:12.0pt;font-style:italic;}p.X590{margin-bottom:5.0pt;}</style></head><body><div style=\"width:595.3pt;margin-bottom:56.7pt;margin-top:96.4pt;margin-left:113.4pt;margin-right:56.7pt;\"><p class=\"X561 X577\"><span class=\"X561 X577\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;font-weight:bold;color:#000000;white-space:pre-wrap;\">Despacho:</span></p><p class=\"X561 X577\"><span class=\"X561 X577\">Vistos.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\">A mat&eacute;ria constitucional suscitada no presente recurso extraordin&aacute;rio corresponde ao tema 1.167 da Gest&atilde;o por Temas da Repercuss&atilde;o Geral do portal do STF na </span><span class=\"X561 X577\" style=\"font-weight:bold;white-space:pre-wrap;\">internet</span><span class=\"X561 X577\">, cujo feito paradigma &eacute; o RE n&ordm; 1.314.490/SP.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\">Ante o exposto, nos termos do art. 328 do Regimento Interno do Supremo Tribunal Federal, determino a devolu&ccedil;&atilde;o dos autos &agrave; Corte de origem para aplica&ccedil;&atilde;o da sistem&aacute;tica da repercuss&atilde;o geral, nos termos dos incisos I a III do art. 1.030 do C&oacute;digo de Processo</span><span class=\"X561 X577\"> Civil.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Publique-se.</span></p><p class=\"X561 X577\"><span class=\"X561 X577\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Bras&iacute;lia, 26 de outubro de 2021.</span></p><p style=\"margin-left:0.0pt;margin-right:0.0pt;text-indent:28.35pt;text-align:justify;margin-top:12.0pt;margin-bottom:0.0pt;white-space:pre-wrap;\"/><p class=\"X561 X583\"><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Ministro </span><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;font-weight:bold;color:#000000;white-space:pre-wrap;\">Dias Toffoli</span></p><p class=\"X561 X583\"><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">Relator</span></p><p class=\"X561 X583\"><span class=\"X561 X583\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;font-style:italic;color:#000000;white-space:pre-wrap;\">Documento assinado digitalmente</span></p><p class=\"X561 X583\"/></div></body></html>",
              envolvidos: ata.envolvidos,
              codigo: "pronunciamento-judicial-colegiado",
              observacao: "",
            })
          })

          djeData.agregacoes[0].itens.push({
            codigo: "Extrato de Ata de Julgamento",
            quantidade: 3,
            descricao: "Extrato de Ata de Julgamento"
          })

          sessionStorage.setItem('publicacoes', JSON.stringify(djeData.publicacoes))
          sessionStorage.setItem('agregacoes', JSON.stringify(djeData.agregacoes))

          return [201, { description: 'Sucesso' }];
        });
    }
}
