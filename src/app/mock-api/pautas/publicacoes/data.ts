import { DjeDto } from "app/modules/acervo/model/interfaces/djeDto.interface";
import { Envolvido } from "app/modules/acervo/model/interfaces/envolvido.interface";
import { InformacoesDto } from "app/modules/acervo/model/interfaces/informacoesDto.interface";
import { ItemDto } from "app/modules/acervo/model/interfaces/itemDto.interface";
import { PublicacaoDto } from "app/modules/acervo/model/interfaces/publicacaoDto.interface";

export const envolvidos: Envolvido[] = [
    {
        nome: "Verenice Pereira da Silva",
        polo: "ATIVO",
        categoria: "RECORRENTE(S)",
        identificacoes: [],
    },
    {
        nome: "Claudio Paulino dos Santos",
        polo: "ATIVO",
        categoria: "ADVOGADO(A/S)",
        identificacoes: ["OAB 422269/SP"],
    },
    {
        nome: "Estado de Alagoas",
        polo: "PASSIVO",
        categoria: "RECORRIDO(A/S)",
        identificacoes: [],
    },
    {
        nome: "Procurador-geral do Estado de Alagoas ",
        polo: "PASSIVO",
        categoria: "PROCURADOR(ES)",
        identificacoes: ["OAB's (422269/SP, 9092/AL, 422269/SP, 9092/AL, 422269/SP, 9092/AL, 422269/SP, 9092/AL)"],
    },
    {
        nome: "Distribuidora Cummins Minas Ltda.",
        polo: "ATIVO",
        categoria: "AGRAVANTE(S)",
        identificacoes: [],
    },
    {
        nome: "Antonio de Rosa",
        polo: "ATIVO",
        categoria: "ADVOGADO(A/S)",
        identificacoes: ["OAB's (001847-A/RJ, 36078A/RS, 957A/BA, 499-A/PE, 32351/SP, 18030/PR, 9448/SC, 1333A/MG)"],
    },
    {
        nome: "Waldir Siqueira",
        polo: "ATIVO",
        categoria: "ADVOGADO(A/S)",
        identificacoes: ["OAB's (18029/PR, 959A/BA, 503-A/PE, 36085A/RS, 7320/SC, 001848/RJ, 01584/A/DF, 62767/SP, 1332A/MG)"],
    },
    {
        nome: "Marcelo Ribeiro de Almeida",
        polo: "ATIVO",
        categoria: "ADVOGADO(A/S)",
        identificacoes: ["OAB's (47054A/RS, 1017A/BA, 138371/RJ, 143225/SP, 1294A/MG, 01870/A/DF, 501-A/PE)"],
    },
    {
        nome: "União",
        polo: "PASSIVO",
        categoria: "AGRAVADO(A/S)",
        identificacoes: [],
    },
    {
        nome: "Procurador-geral da Fazenda Nacional",
        polo: "PASSIVO",
        categoria: "ADVOGADO(A/S)",
        identificacoes: ["OAB 00000/DF"],
    },
]

export const publicacao: PublicacaoDto[] = [
    {
        id: 1,
        processo: "ARE 1071279",
        processoId: 1,
        tipo: "Despacho",
        relator: "Ministro Luiz Fux",
        divulgacao: "2016-08-29T09:12:33.001Z",
        publicacao: "2016-08-29T09:12:33.001Z",
        texto: "<html><head><style>p{margin-top:0pt;margin-bottom:1pt;}span.X44{font-size:9.0pt;font-weight:bold;color:#4f81bd;}span.X392{font-family:'Arial';font-size:20.0pt;}p.X393{margin-top:18.0pt;margin-bottom:10.0pt;}span.X393{font-family:'Arial';font-size:17.0pt;}span.X394{font-family:'Arial';font-size:17.0pt;}p.X395{margin-top:16.0pt;margin-bottom:10.0pt;}span.X395{font-family:'Arial';font-size:15.0pt;}span.X396{font-family:'Arial';font-size:15.0pt;}p.X397{margin-top:16.0pt;margin-bottom:10.0pt;}span.X397{font-family:'Arial';font-size:13.0pt;font-weight:bold;}span.X398{font-family:'Arial';font-size:13.0pt;font-weight:bold;}p.X399{margin-top:16.0pt;margin-bottom:10.0pt;}span.X399{font-family:'Arial';font-size:12.0pt;font-weight:bold;}span.X400{font-family:'Arial';font-size:12.0pt;font-weight:bold;}p.X401{margin-top:16.0pt;margin-bottom:10.0pt;}span.X401{font-family:'Arial';font-size:11.0pt;font-weight:bold;}span.X402{font-family:'Arial';font-size:11.0pt;font-weight:bold;}p.X403{margin-top:16.0pt;margin-bottom:10.0pt;}span.X403{font-family:'Arial';font-size:11.0pt;font-weight:bold;font-style:italic;}span.X404{font-family:'Arial';font-size:11.0pt;font-weight:bold;font-style:italic;}p.X405{margin-top:16.0pt;margin-bottom:10.0pt;}span.X405{font-family:'Arial';font-size:11.0pt;font-style:italic;}span.X406{font-family:'Arial';font-size:11.0pt;font-style:italic;}p.X407{margin-top:16.0pt;margin-bottom:10.0pt;}span.X407{font-family:'Arial';font-size:10.0pt;font-style:italic;}span.X408{font-family:'Arial';font-size:10.0pt;font-style:italic;}p.X409{margin-left:36.0pt;}p.X410{margin-top:0.0pt;margin-bottom:0.0pt;}span.X411{font-size:24.0pt;}span.X412{font-size:12.0pt;}p.X413{margin-left:36.0pt;margin-right:36.0pt;}span.X413{font-style:italic;}span.X414{font-style:italic;}p.X415{margin-left:36.0pt;margin-right:36.0pt;background-color:#f2f2f2;}span.X415{font-style:italic;}span.X416{font-style:italic;}p.X419{margin-bottom:0.0pt;}p.X420{margin-bottom:0.0pt;}p.X421{margin-bottom:0.0pt;}p.X422{margin-bottom:0.0pt;}p.X423{margin-bottom:0.0pt;}p.X424{margin-bottom:0.0pt;}p.X425{margin-bottom:0.0pt;}p.X426{margin-bottom:0.0pt;}p.X427{margin-bottom:0.0pt;}p.X428{margin-bottom:0.0pt;}p.X429{margin-bottom:0.0pt;}p.X430{margin-bottom:0.0pt;}p.X431{margin-bottom:0.0pt;}p.X432{margin-bottom:0.0pt;}p.X433{margin-bottom:0.0pt;}p.X434{margin-bottom:0.0pt;}p.X435{margin-bottom:0.0pt;}p.X436{margin-bottom:0.0pt;}p.X437{margin-bottom:0.0pt;}p.X438{margin-bottom:0.0pt;}p.X439{margin-bottom:0.0pt;}p.X440{margin-bottom:0.0pt;}p.X441{margin-bottom:0.0pt;}p.X442{margin-bottom:0.0pt;}p.X443{margin-bottom:0.0pt;}p.X444{margin-bottom:0.0pt;}p.X445{margin-bottom:0.0pt;}p.X446{margin-bottom:0.0pt;}p.X447{margin-bottom:0.0pt;}p.X448{margin-bottom:0.0pt;}p.X449{margin-bottom:0.0pt;}p.X450{margin-bottom:0.0pt;}p.X451{margin-bottom:0.0pt;}p.X452{margin-bottom:0.0pt;}p.X453{margin-bottom:0.0pt;}p.X454{margin-bottom:0.0pt;}p.X455{margin-bottom:0.0pt;}p.X456{margin-bottom:0.0pt;}p.X457{margin-bottom:0.0pt;}p.X458{margin-bottom:0.0pt;}p.X459{margin-bottom:0.0pt;}p.X460{margin-bottom:0.0pt;}p.X461{margin-bottom:0.0pt;}p.X462{margin-bottom:0.0pt;}p.X463{margin-bottom:0.0pt;}p.X464{margin-bottom:0.0pt;}p.X465{margin-bottom:0.0pt;}p.X466{margin-bottom:0.0pt;}p.X467{margin-bottom:0.0pt;}p.X468{margin-bottom:0.0pt;}p.X469{margin-bottom:0.0pt;}p.X470{margin-bottom:0.0pt;}p.X471{margin-bottom:0.0pt;}p.X472{margin-bottom:0.0pt;}p.X473{margin-bottom:0.0pt;}p.X474{margin-bottom:0.0pt;}p.X475{margin-bottom:0.0pt;}p.X476{margin-bottom:0.0pt;}p.X477{margin-bottom:0.0pt;}p.X478{margin-bottom:0.0pt;}p.X479{margin-bottom:0.0pt;}p.X480{margin-bottom:0.0pt;}p.X481{margin-bottom:0.0pt;}p.X482{margin-bottom:0.0pt;}p.X483{margin-bottom:0.0pt;}p.X484{margin-bottom:0.0pt;}p.X485{margin-bottom:0.0pt;}p.X486{margin-bottom:0.0pt;}p.X487{margin-bottom:0.0pt;}p.X488{margin-bottom:0.0pt;}p.X489{margin-bottom:0.0pt;}p.X490{margin-bottom:0.0pt;}p.X491{margin-bottom:0.0pt;}p.X492{margin-bottom:0.0pt;}p.X493{margin-bottom:0.0pt;}p.X494{margin-bottom:0.0pt;}p.X495{margin-bottom:0.0pt;}p.X496{margin-bottom:0.0pt;}p.X497{margin-bottom:0.0pt;}p.X498{margin-bottom:0.0pt;}p.X499{margin-bottom:0.0pt;}p.X500{margin-bottom:0.0pt;}p.X501{margin-bottom:0.0pt;}p.X502{margin-bottom:0.0pt;}p.X503{margin-bottom:0.0pt;}p.X504{margin-bottom:0.0pt;}p.X505{margin-bottom:0.0pt;}p.X506{margin-bottom:0.0pt;}p.X507{margin-bottom:0.0pt;}p.X508{margin-bottom:0.0pt;}p.X509{margin-bottom:0.0pt;}p.X510{margin-bottom:0.0pt;}p.X511{margin-bottom:0.0pt;}p.X512{margin-bottom:0.0pt;}p.X513{margin-bottom:0.0pt;}p.X514{margin-bottom:0.0pt;}p.X515{margin-bottom:0.0pt;}p.X516{margin-bottom:0.0pt;}p.X517{margin-bottom:0.0pt;}p.X518{margin-bottom:0.0pt;}p.X519{margin-bottom:0.0pt;}p.X520{margin-bottom:0.0pt;}p.X521{margin-bottom:0.0pt;}p.X522{margin-bottom:0.0pt;}p.X523{margin-bottom:0.0pt;}p.X524{margin-bottom:0.0pt;}span.X524{color:#404040;}p.X525{margin-bottom:0.0pt;}span.X525{color:#404040;}p.X526{margin-bottom:0.0pt;}span.X526{color:#404040;}p.X527{margin-bottom:0.0pt;}span.X527{color:#404040;}p.X528{margin-bottom:0.0pt;}span.X528{color:#404040;}p.X529{margin-bottom:0.0pt;}span.X529{color:#404040;}p.X530{margin-bottom:0.0pt;}span.X530{color:#404040;}p.X531{margin-bottom:0.0pt;}span.X531{color:#404040;}p.X532{margin-bottom:0.0pt;}span.X532{color:#404040;}p.X533{margin-bottom:0.0pt;}span.X533{color:#404040;}p.X534{margin-bottom:0.0pt;}span.X534{color:#404040;}p.X535{margin-bottom:0.0pt;}span.X535{color:#404040;}p.X536{margin-bottom:0.0pt;}span.X536{color:#404040;}p.X537{margin-bottom:0.0pt;}span.X537{color:#404040;}p.X538{margin-bottom:0.0pt;}p.X539{margin-bottom:0.0pt;}p.X540{margin-bottom:0.0pt;}p.X541{margin-bottom:0.0pt;}p.X542{margin-bottom:0.0pt;}p.X543{margin-bottom:0.0pt;}p.X544{margin-bottom:0.0pt;}span.X545{color:#0000ff;text-decoration:underline;}p.X546{margin-bottom:2.0pt;}span.X546{font-size:9.0pt;}span.X547{font-size:9.0pt;}p.X549{margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X550{margin-left:14.15pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X551{margin-left:28.35pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X552{margin-left:42.5pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X553{margin-left:56.7pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X554{margin-left:70.85pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X555{margin-left:85.05pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X556{margin-left:99.2pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X557{margin-left:113.4pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X559{text-align:justify;margin-top:0.0pt;margin-bottom:8.0pt;}span.X559{font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;}span.X560{font-size:16.0pt;font-weight:bold;}span.X562{color:#000080;text-decoration:underline;}p.X563{margin-top:0.0pt;margin-bottom:6.0pt;}p.X566{margin-top:12.0pt;margin-bottom:6.0pt;}span.X566{font-family:'Arial';font-size:14.0pt;}p.X567{margin-top:12.0pt;margin-bottom:6.0pt;}span.X567{font-family:'Arial';font-size:14.0pt;}p.X568{text-align:center;}span.X568{font-style:italic;}p.X569{margin-top:6.0pt;margin-bottom:6.0pt;}span.X569{font-size:12.0pt;font-style:italic;}p.X571{margin-left:0.0pt;margin-right:0.0pt;text-indent:0.3pt;margin-bottom:0.0pt;}span.X572{font-weight:bold;}p.X573{text-align:left;}p.X574{text-align:center;}span.X574{font-weight:bold;}p.X575{margin-left:0.0pt;margin-right:0.0pt;text-indent:28.35pt;margin-bottom:0.0pt;}p.X576{margin-left:85.05pt;margin-right:0.0pt;text-indent:28.35pt;}span.X576{font-size:12.0pt;}p.X577{margin-left:113.4pt;margin-right:0.0pt;text-indent:28.35pt;}span.X577{font-size:12.0pt;}p.X578{margin-left:141.75pt;margin-right:0.0pt;text-indent:28.35pt;}span.X578{font-size:12.0pt;}p.X579{margin-left:170.1pt;margin-right:0.0pt;text-indent:28.35pt;}span.X579{font-size:12.0pt;}p.X580{margin-left:198.45pt;margin-right:0.0pt;text-indent:28.35pt;}span.X580{font-size:12.0pt;}p.X581{text-align:center;margin-bottom:0.0pt;}p.X582{margin-left:170.1pt;margin-right:0.0pt;text-indent:0.0pt;}p.X583{text-align:center;}span.X583{font-size:12.0pt;font-style:italic;}p.X588{margin-bottom:5.0pt;}</style></head><body><div style=\"width:595.3pt;margin-bottom:56.7pt;margin-top:96.4pt;margin-left:113.4pt;margin-right:56.7pt;\"><p class=\"X559 X575\"><span class=\"X559 X575\" style=\"font-weight:bold;white-space:pre-wrap;\">DESPACHO:</span><span class=\"X559 X575\" style=\"font-weight:bold;white-space:pre-wrap;\"> </span><span id=\"_GoBack\"/><span class=\"X559 X575\">Trata-se de recurso extraordin&aacute;rio com agravo contra decis&atilde;o de inadmiss&atilde;o do recurso extraordin&aacute;rio.</span></p><p class=\"X559 X575\"><span class=\"X559 X575\">O</span><span class=\"X559 X575\"> Supremo Tribunal Federal, examinando o Recurso Extraordin&aacute;rio n&ordm; 882461 segundo a sistem&aacute;tica da repercuss&atilde;o geral (Tema n&ordm; 816), decidiu que: h&aacute; repercuss&atilde;o geral - Ac&oacute;rd&atilde;o de Repercuss&atilde;o Geral publicado.</span></p><p class=\"X559 X575\"><span class=\"X559 X575\">O C&oacute;digo de Processo Civil assim disciplina os procedimentos aplic&aacute;veis aos recursos extraordin&aacute;rios que suscitem </span><span class=\"X559 X575\">mat&eacute;ria(</span><span class=\"X559 X575\">s) analisada(s) pelo STF no rito da repercuss&atilde;o geral:</span></p><p class=\"X559 X575\"/><p class=\"X559 X576\"><span class=\"X559 X576\">Art. 1.030. Recebida a peti&ccedil;&atilde;o do recurso pela secretaria do tribunal, o recorrido ser&aacute; intimado para apresentar contrarraz&otilde;es no prazo de 15 (quinze) dias, findo o qual </span><span class=\"X559 X576\">os autos ser&atilde;o conclusos ao presidente ou ao vice-presidente do tribunal recorrido, que dever&aacute;:</span><span class=\"X559 X576\"> </span><span class=\"X559 X576\">(Reda&ccedil;&atilde;o dada pela Lei n&ordm; 13.256, de 2016)</span><span class=\"X559 X576\">(Vig&ecirc;ncia)</span></p><p class=\"X559 X576\"><span class=\"X559 X576\" style=\"font-weight:bold;white-space:pre-wrap;\">I &ndash; negar seguimento:</span><span class=\"X559 X576\"> </span><span class=\"X559 X576\">(Inclu&iacute;do pela Lei n&ordm; 13.256, de 2016)</span><span class=\"X559 X576\"> </span><span class=\"X559 X576\">(Vig&ecirc;ncia)</span></p><p class=\"X559 X576\"><span class=\"X559 X576\">a) a recurso extraordin&aacute;rio que discuta quest&atilde;o constitucional </span><span class=\"X559 X576\">&agrave; qual o Supremo Tribunal Federal n&atilde;o tenha reconhecido a exist&ecirc;ncia de repercuss&atilde;o geral ou a recurso extraordin&aacute;rio interposto contra ac&oacute;rd&atilde;o que esteja em conformidade com entendimento do Supremo Tribunal Federal exarado no regime de repercuss&atilde;o geral; </span><span class=\"X559 X576\">(Inclu&iacute;da pela Lei n&ordm; 13.256, de 2016)</span><span class=\"X559 X576\"> </span><span class=\"X559 X576\">(Vig&ecirc;ncia)</span></p><p class=\"X559 X576\"><span class=\"X559 X576\">b)</span><span class=\"X559 X576\"> a recurso extraordin&aacute;rio ou a recurso especial interposto contra ac&oacute;rd&atilde;o que esteja em conformidade com entendimento do Supremo Tribunal Federal ou do Superior Tribunal de Justi&ccedil;a, respectivamente, exarado no regime de julgamento de recursos repetitivos; </span><span class=\"X559 X576\">(Inclu&iacute;da pela Lei n&ordm; 13.256, de 2016)</span><span class=\"X559 X576\">(Vig&ecirc;ncia)</span></p><p class=\"X559 X576\"><span class=\"X559 X576\" style=\"font-weight:bold;white-space:pre-wrap;\">II &ndash; encaminhar o processo ao &oacute;rg&atilde;o julgador</span><span class=\"X559 X576\"> para realiza&ccedil;&atilde;o do ju&iacute;zo de retrata&ccedil;&atilde;o,</span><span class=\"X559 X576\"> se o ac&oacute;rd&atilde;o recorrido divergir do entendimento do Supremo Tribunal Federal ou do Superior Tribunal de Justi&ccedil;a exarado, conforme o caso, nos regimes de repercuss&atilde;o geral ou de recursos repetitivos; </span><span class=\"X559 X576\">(Inclu&iacute;do pela Lei n&ordm; 13.256, de 2016) </span><span class=\"X559 X576\">(Vig&ecirc;ncia)</span></p><p class=\"X559 X576\"><span class=\"X559 X576\" style=\"font-weight:bold;white-space:pre-wrap;\">III &ndash; sobrestar o recurso</span><span class=\"X559 X576\"> que versar sobre controv&eacute;rsia de car&aacute;ter repetitivo ainda n&atilde;o decidida pelo Supremo Tribunal Federal ou pelo Superior Tribunal de Justi&ccedil;a, conforme se trate de mat&eacute;ria constitucional ou infraconstitucional; </span><span class=\"X559 X576\">(Inclu&iacute;do pela Lei n&ordm; 13.256, de 2016) </span><span class=\"X559 X576\">(Vig&ecirc;ncia)</span><span class=\"X559 X576\"> (grifo nosso)</span><span class=\"X559 X576\">.</span></p><p class=\"X559 X575\" style=\"text-indent:0.0pt;white-space:pre-wrap;\"/><p class=\"X559 X575\"><span class=\"X559 X575\" style=\"font-style:italic;white-space:pre-wrap;\">Ex positis</span><span class=\"X559 X575\">, </span><span class=\"X559 X575\">determino a devolu&ccedil;&atilde;o dos autos &agrave; Corte de origem p</span><span class=\"X559 X575\">ara que adote, conforme a situa&ccedil;&atilde;o do(s) referido(s) tema(s) de repercuss&atilde;o geral, os procedimentos previstos nos incisos I a III do artigo 1.030 do C&oacute;digo de Processo Civil (al&iacute;nea c do inciso V do art. 13 do Regimento Interno do Supremo Tribunal Federal)</span><span class=\"X559 X575\">.</span></p><p class=\"X559 X575\"><span class=\"X559 X575\">Publique-se.</span></p><p class=\"X559 X575\"><span class=\"X559 X575\">Bras&iacute;lia, 22 de outubro de 2021.</span></p><p class=\"X559 X575\"/><p class=\"X559 X581\"><span class=\"X559 X581\">Ministro </span><span class=\"X559 X581\" style=\"font-weight:bold;white-space:pre-wrap;\">LUIZ FUX</span></p><p class=\"X559 X581\"><span class=\"X559 X581\">Presidente</span></p><p class=\"X559 X583\"><span class=\"X559 X583\">Documento assinado digitalmente</span></p></div></body></html>",
        envolvidos: [envolvidos[0], envolvidos[1], envolvidos[2], envolvidos[3]],
        codigo: "decisoes-minutas:77590",
        observacao: "",
    },
    {
        id: 2,
        processo: "AI 868483",
        processoId: 2,
        tipo: "Despacho",
        relator: "Ministro Presidente",
        divulgacao: "2021-10-27T18:47:10.654",
        publicacao: "2021-10-28",
        texto: "<html><head><style>p{margin-top:0pt;margin-bottom:1pt;}span.X388{font-family:'Arial';font-size:20.0pt;}p.X389{margin-top:18.0pt;margin-bottom:10.0pt;}span.X389{font-family:'Arial';font-size:17.0pt;}span.X390{font-family:'Arial';font-size:17.0pt;}p.X391{margin-top:16.0pt;margin-bottom:10.0pt;}span.X391{font-family:'Arial';font-size:15.0pt;}span.X392{font-family:'Arial';font-size:15.0pt;}p.X393{margin-top:16.0pt;margin-bottom:10.0pt;}span.X393{font-family:'Arial';font-size:13.0pt;font-weight:bold;}span.X394{font-family:'Arial';font-size:13.0pt;font-weight:bold;}p.X395{margin-top:16.0pt;margin-bottom:10.0pt;}span.X395{font-family:'Arial';font-size:12.0pt;font-weight:bold;}span.X396{font-family:'Arial';font-size:12.0pt;font-weight:bold;}p.X397{margin-top:16.0pt;margin-bottom:10.0pt;}span.X397{font-family:'Arial';font-size:11.0pt;font-weight:bold;}span.X398{font-family:'Arial';font-size:11.0pt;font-weight:bold;}p.X399{margin-top:16.0pt;margin-bottom:10.0pt;}span.X399{font-family:'Arial';font-size:11.0pt;font-weight:bold;font-style:italic;}span.X400{font-family:'Arial';font-size:11.0pt;font-weight:bold;font-style:italic;}p.X401{margin-top:16.0pt;margin-bottom:10.0pt;}span.X401{font-family:'Arial';font-size:11.0pt;font-style:italic;}span.X402{font-family:'Arial';font-size:11.0pt;font-style:italic;}p.X403{margin-top:16.0pt;margin-bottom:10.0pt;}span.X403{font-family:'Arial';font-size:10.0pt;font-style:italic;}span.X404{font-family:'Arial';font-size:10.0pt;font-style:italic;}p.X405{margin-left:36.0pt;}p.X406{margin-top:0.0pt;margin-bottom:0.0pt;}span.X407{font-size:24.0pt;}span.X408{font-size:12.0pt;}p.X409{margin-left:36.0pt;margin-right:36.0pt;}span.X409{font-style:italic;}span.X410{font-style:italic;}p.X411{margin-left:36.0pt;margin-right:36.0pt;background-color:#f2f2f2;}span.X411{font-style:italic;}span.X412{font-style:italic;}p.X415{margin-bottom:0.0pt;}p.X416{margin-bottom:0.0pt;}p.X417{margin-bottom:0.0pt;}p.X418{margin-bottom:0.0pt;}p.X419{margin-bottom:0.0pt;}p.X420{margin-bottom:0.0pt;}p.X421{margin-bottom:0.0pt;}p.X422{margin-bottom:0.0pt;}p.X423{margin-bottom:0.0pt;}p.X424{margin-bottom:0.0pt;}p.X425{margin-bottom:0.0pt;}p.X426{margin-bottom:0.0pt;}p.X427{margin-bottom:0.0pt;}p.X428{margin-bottom:0.0pt;}p.X429{margin-bottom:0.0pt;}p.X430{margin-bottom:0.0pt;}p.X431{margin-bottom:0.0pt;}p.X432{margin-bottom:0.0pt;}p.X433{margin-bottom:0.0pt;}p.X434{margin-bottom:0.0pt;}p.X435{margin-bottom:0.0pt;}p.X436{margin-bottom:0.0pt;}p.X437{margin-bottom:0.0pt;}p.X438{margin-bottom:0.0pt;}p.X439{margin-bottom:0.0pt;}p.X440{margin-bottom:0.0pt;}p.X441{margin-bottom:0.0pt;}p.X442{margin-bottom:0.0pt;}p.X443{margin-bottom:0.0pt;}p.X444{margin-bottom:0.0pt;}p.X445{margin-bottom:0.0pt;}p.X446{margin-bottom:0.0pt;}p.X447{margin-bottom:0.0pt;}p.X448{margin-bottom:0.0pt;}p.X449{margin-bottom:0.0pt;}p.X450{margin-bottom:0.0pt;}p.X451{margin-bottom:0.0pt;}p.X452{margin-bottom:0.0pt;}p.X453{margin-bottom:0.0pt;}p.X454{margin-bottom:0.0pt;}p.X455{margin-bottom:0.0pt;}p.X456{margin-bottom:0.0pt;}p.X457{margin-bottom:0.0pt;}p.X458{margin-bottom:0.0pt;}p.X459{margin-bottom:0.0pt;}p.X460{margin-bottom:0.0pt;}p.X461{margin-bottom:0.0pt;}p.X462{margin-bottom:0.0pt;}p.X463{margin-bottom:0.0pt;}p.X464{margin-bottom:0.0pt;}p.X465{margin-bottom:0.0pt;}p.X466{margin-bottom:0.0pt;}p.X467{margin-bottom:0.0pt;}p.X468{margin-bottom:0.0pt;}p.X469{margin-bottom:0.0pt;}p.X470{margin-bottom:0.0pt;}p.X471{margin-bottom:0.0pt;}p.X472{margin-bottom:0.0pt;}p.X473{margin-bottom:0.0pt;}p.X474{margin-bottom:0.0pt;}p.X475{margin-bottom:0.0pt;}p.X476{margin-bottom:0.0pt;}p.X477{margin-bottom:0.0pt;}p.X478{margin-bottom:0.0pt;}p.X479{margin-bottom:0.0pt;}p.X480{margin-bottom:0.0pt;}p.X481{margin-bottom:0.0pt;}p.X482{margin-bottom:0.0pt;}p.X483{margin-bottom:0.0pt;}p.X484{margin-bottom:0.0pt;}p.X485{margin-bottom:0.0pt;}p.X486{margin-bottom:0.0pt;}p.X487{margin-bottom:0.0pt;}p.X488{margin-bottom:0.0pt;}p.X489{margin-bottom:0.0pt;}p.X490{margin-bottom:0.0pt;}p.X491{margin-bottom:0.0pt;}p.X492{margin-bottom:0.0pt;}p.X493{margin-bottom:0.0pt;}p.X494{margin-bottom:0.0pt;}p.X495{margin-bottom:0.0pt;}p.X496{margin-bottom:0.0pt;}p.X497{margin-bottom:0.0pt;}p.X498{margin-bottom:0.0pt;}p.X499{margin-bottom:0.0pt;}p.X500{margin-bottom:0.0pt;}p.X501{margin-bottom:0.0pt;}p.X502{margin-bottom:0.0pt;}p.X503{margin-bottom:0.0pt;}p.X504{margin-bottom:0.0pt;}p.X505{margin-bottom:0.0pt;}p.X506{margin-bottom:0.0pt;}p.X507{margin-bottom:0.0pt;}p.X508{margin-bottom:0.0pt;}p.X509{margin-bottom:0.0pt;}p.X510{margin-bottom:0.0pt;}p.X511{margin-bottom:0.0pt;}p.X512{margin-bottom:0.0pt;}p.X513{margin-bottom:0.0pt;}p.X514{margin-bottom:0.0pt;}p.X515{margin-bottom:0.0pt;}p.X516{margin-bottom:0.0pt;}p.X517{margin-bottom:0.0pt;}p.X518{margin-bottom:0.0pt;}p.X519{margin-bottom:0.0pt;}p.X520{margin-bottom:0.0pt;}span.X520{color:#404040;}p.X521{margin-bottom:0.0pt;}span.X521{color:#404040;}p.X522{margin-bottom:0.0pt;}span.X522{color:#404040;}p.X523{margin-bottom:0.0pt;}span.X523{color:#404040;}p.X524{margin-bottom:0.0pt;}span.X524{color:#404040;}p.X525{margin-bottom:0.0pt;}span.X525{color:#404040;}p.X526{margin-bottom:0.0pt;}span.X526{color:#404040;}p.X527{margin-bottom:0.0pt;}span.X527{color:#404040;}p.X528{margin-bottom:0.0pt;}span.X528{color:#404040;}p.X529{margin-bottom:0.0pt;}span.X529{color:#404040;}p.X530{margin-bottom:0.0pt;}span.X530{color:#404040;}p.X531{margin-bottom:0.0pt;}span.X531{color:#404040;}p.X532{margin-bottom:0.0pt;}span.X532{color:#404040;}p.X533{margin-bottom:0.0pt;}span.X533{color:#404040;}p.X534{margin-bottom:0.0pt;}p.X535{margin-bottom:0.0pt;}p.X536{margin-bottom:0.0pt;}p.X537{margin-bottom:0.0pt;}p.X538{margin-bottom:0.0pt;}p.X539{margin-bottom:0.0pt;}p.X540{margin-bottom:0.0pt;}span.X541{color:#0000ff;text-decoration:underline;}p.X542{margin-bottom:2.0pt;}span.X542{font-size:9.0pt;}span.X543{font-size:9.0pt;}p.X545{margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X546{margin-left:14.15pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X547{margin-left:28.35pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X548{margin-left:42.5pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X549{margin-left:56.7pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X550{margin-left:70.85pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X551{margin-left:85.05pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X552{margin-left:99.2pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X553{margin-left:113.4pt;margin-right:0.0pt;text-indent:0.0pt;margin-bottom:2.85pt;}p.X555{text-align:justify;margin-top:0.0pt;margin-bottom:8.0pt;}span.X555{font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;}span.X556{font-size:16.0pt;font-weight:bold;}span.X559{color:#000080;text-decoration:underline;}p.X562{margin-top:0.0pt;margin-bottom:6.0pt;}p.X566{margin-top:12.0pt;margin-bottom:6.0pt;}span.X566{font-family:'Arial';font-size:14.0pt;}p.X568{margin-top:12.0pt;margin-bottom:6.0pt;}span.X568{font-family:'Arial';font-size:14.0pt;}p.X569{text-align:center;}span.X569{font-style:italic;}p.X570{margin-top:6.0pt;margin-bottom:6.0pt;}span.X570{font-size:12.0pt;font-style:italic;}p.X572{margin-left:0.0pt;margin-right:0.0pt;text-indent:0.3pt;margin-bottom:0.0pt;}span.X573{font-weight:bold;}p.X574{text-align:left;}p.X575{text-align:center;}span.X575{font-weight:bold;}p.X576{margin-left:0.0pt;margin-right:0.0pt;text-indent:28.35pt;margin-bottom:0.0pt;}p.X577{margin-left:85.05pt;margin-right:0.0pt;text-indent:28.35pt;}span.X577{font-size:12.0pt;}p.X578{margin-left:113.4pt;margin-right:0.0pt;text-indent:28.35pt;}span.X578{font-size:12.0pt;}p.X579{margin-left:141.75pt;margin-right:0.0pt;text-indent:28.35pt;}span.X579{font-size:12.0pt;}p.X580{margin-left:170.1pt;margin-right:0.0pt;text-indent:28.35pt;}span.X580{font-size:12.0pt;}p.X581{margin-left:198.45pt;margin-right:0.0pt;text-indent:28.35pt;}span.X581{font-size:12.0pt;}p.X582{text-align:center;margin-bottom:0.0pt;}p.X583{margin-left:170.1pt;margin-right:0.0pt;text-indent:0.0pt;}p.X584{text-align:center;}span.X584{font-size:12.0pt;font-style:italic;}p.CabecalhoEspaco{margin-bottom:5.0pt;}</style></head><body><div style=\"width:595.3pt;margin-bottom:56.7pt;margin-top:96.4pt;margin-left:113.4pt;margin-right:56.7pt;\"><p class=\"X555 X576\"><span class=\"X555 X576\" style=\"font-weight:bold;white-space:pre-wrap;\">DESPACHO:</span><span class=\"X555 X576\" style=\"font-weight:bold;white-space:pre-wrap;\"> </span><span id=\"_GoBack\"/><span class=\"X555 X576\">Trata-se de recurso extraordin&aacute;rio com agravo contra decis&atilde;o de inadmiss&atilde;o do recurso extraordin&aacute;rio.</span></p><p class=\"X555 X576\"><span class=\"X555 X576\">Analisados os autos, </span><span class=\"X555 X576\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">verifica-se que inexistem &oacute;bices </span><span class=\"X555 X576\" style=\"font-family:'Palatino Linotype';font-size:13.0pt;color:#000000;white-space:pre-wrap;\">jur&iacute;dicos que justifiquem a atua&ccedil;&atilde;o da Presid&ecirc;ncia neste feito (art. 13, inciso V, al&iacute;nea c, do Regimento Interno do Supremo Tribunal Federal).</span></p><p class=\"X555 X576\"><span class=\"X555 X576\" style=\"font-style:italic;white-space:pre-wrap;\">Ex positis</span><span class=\"X555 X576\">, </span><span class=\"X555 X576\"/><span class=\"X555 X576\"/><span class=\"X555 X576\">determino </span><span class=\"X555 X576\">a</span><span class=\"X555 X576\"> </span><span class=\"X555 X576\">distribui&ccedil;&atilde;o</span><span class=\"X555 X576\"> </span><span class=\"X555 X576\">d</span><span class=\"X555 X576\">o </span><span class=\"X555 X576\">processo conforme expresso no regimento</span><span class=\"X555 X576\">.</span></p><p class=\"X555 X576\"><span class=\"X555 X576\">Publique-se.</span></p><p class=\"X555 X576\"><span class=\"X555 X576\">Bras&iacute;lia, 26 de outubro de 2021.</span></p><p class=\"X555 X576\"><br/></p><p class=\"X555 X582\"><span class=\"X555 X582\">Ministro </span><span class=\"X555 X582\" style=\"font-weight:bold;white-space:pre-wrap;\">LUIZ FUX</span></p><p class=\"X555 X582\"><span class=\"X555 X582\">Presidente</span></p><p class=\"X555 X584\"><span class=\"X555 X584\">Documento assinado digitalmente</span></p></div></body></html>",
        envolvidos: [envolvidos[4], envolvidos[5], envolvidos[6], envolvidos[7], envolvidos[8], envolvidos[9]],
        codigo: "decisoes-minutas:78773",
        observacao: "",
    },
]

export const item: ItemDto[] = [
    {
        codigo: "Decisão Final",
        quantidade: 228,
        descricao: "Decisão Final"
    },
    {
        codigo: "Despacho",
        quantidade: 131,
        descricao: "Despacho"
    },
    {
        codigo: "Decisão Liminar",
        quantidade: 2,
        descricao: "Decisão Liminar"
    },
    {
        codigo: "Decisão Interlocutória",
        quantidade: 1,
        descricao: "Decisão Interlocutória"
    },
    {
        codigo: "MINISTRO PRESIDENTE",
        quantidade: 335,
        descricao: "MINISTRO PRESIDENTE"
    },
    {
        codigo: "MIN. DIAS TOFFOLI",
        quantidade: 14,
        descricao: "MIN. DIAS TOFFOLI"
    },
    {
        codigo: "MIN. ROBERTO BARROSO",
        quantidade: 13,
        descricao: "MIN. ROBERTO BARROSO"
    },
]

export const informacoes: InformacoesDto[] = [
    {
        nome: "Tipo",
        tipo: "",
        criterio: "",
        itens: [item[0], item[1], item[2], item[3]]
    },
    {
        nome: "Relator",
        tipo: "",
        criterio: "",
        itens: [item[4], item[5], item[6]]
    },
]

export const dje: DjeDto = {
    agregacoes: informacoes,
    publicacoes: publicacao,
    total: 362
}