import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProcessoService } from 'app/modules/services/processo.service';
import { RevisarInteiroTeorService } from 'app/modules/services/revisar-inteiro-teor.service';
import { SessaoDeJulgamentoService } from 'app/modules/services/sessao-de-julgamento.service';
import { Ministro } from 'app/shared/model/interfaces/ministro.interface';
import { Processo } from 'app/shared/model/interfaces/processo.interface';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';
import { DialogoIncluirDocumentoComponent } from './dialogo-incluir-documento/dialogo-incluir-documento.component';

@Component({
  selector: 'digital-detalhes-sessao',
  templateUrl: './detalhes-sessao.component.html',
  styleUrls: ['./detalhes-sessao.component.scss']
})
export class DetalhesSessaoComponent implements OnInit {

  sessao: SessaoDeJulgamento;
  totalMinistrosPresentes: number = 0;
  totalMinistrosAusentes: number = 0;
  processosSelecionados: Processo[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _sessaoDeJulgamentoService: SessaoDeJulgamentoService,
    private _dialog: MatDialog,
    private _inteiroTeorService: RevisarInteiroTeorService,
    private _processoService: ProcessoService,
  ) { }

  ngOnInit(): void {
    const numero = +this._route.snapshot.queryParamMap.get('numero');
    const ano = +this._route.snapshot.queryParamMap.get('ano');

    this._sessaoDeJulgamentoService.obterSessaoDeJulgamento(numero, ano).subscribe({
      next: (sessao) => {
        this.sessao = sessao;
        this.totalMinistrosPresentes = this.sessao.ata.ministros_presentes.length;
        this.totalMinistrosAusentes = this.sessao.ata.ministros_ausentes.length;
        console.log(sessao);
      }
    });
  }

  public limitarListaDeMinistros(ministros: Ministro[], limite: number = 3): Ministro[] {
    if (ministros?.length === 0) {
      return [];
    }
    return ministros?.slice(0, limite);
  }

  public listarNomesDosMinistros(ministros: Ministro[]): string {
    let nomes = ``;
    
    for (let i = 0; i < ministros.length; i++) {
      nomes += `${(i+1)}º ${ministros[i].nome}\n`;
    }

    return nomes;
  }

  public totalMinistros(ministros: Ministro[]): number {
    return ministros.length - ministros.slice(0, 3).length;
  }

  public obterProcessosSelecionados(processos: Processo[]): void {
    this.processosSelecionados = processos;
  }

  public abrirModalDeIncluirDocumento(): void {
    const idProcesso = this.processosSelecionados[0].id;

    this._inteiroTeorService.obterInteiroTeorDoAcordao(idProcesso).subscribe({
      next: (revisoes) => {
        const dialogRef = this._dialog.open(DialogoIncluirDocumentoComponent, {
          maxHeight: '560px',
          data: revisoes.documentos,
        });

        dialogRef.afterClosed().subscribe((data: number[]) => {
          if (data) {
            this._inteiroTeorService.incluirDocumentosDoInteiroTeorDoProcesso(idProcesso, data).subscribe({
                next: (data) => {
                  //this.revisoesAlteradas.emit(data);
                },
                error: (error) => {
                  
                }
            })
          }
        });
      },
      error: (error) => {}
    });
  }

}
