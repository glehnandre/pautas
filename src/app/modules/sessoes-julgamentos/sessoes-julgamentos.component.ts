import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { Documento } from '../acervo/model/interfaces/documento.interface';
import { Tag } from '../acervo/model/interfaces/tag.interface';
import { ProcessoService } from '../services/processo.service';
import { JulgamentoService } from '../services/julgamento.service';
import { Impedimento } from '../acervo/model/interfaces/impedimento.interface';
import { MatDialog } from '@angular/material/dialog';
import { ImpedimentoComponent } from './impedimento/impedimento.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FuseDrawerService } from '@fuse/components/drawer';

@Component({
  selector: 'app-sessoes-julgamentos',
  templateUrl: './sessoes-julgamentos.component.html',
  styleUrls: ['./sessoes-julgamentos.component.scss']
})
export class SessoesJulgamentosComponent implements OnInit {

  impedimentos: Impedimento[][] = [];
  processos: Processo[] = [];
  sessao: SessaoJulgamento;
  tags: string[];
  documentos: string[];
  link: SafeResourceUrl;

  constructor(
    private _processoService: ProcessoService,
    private _julgamentoService: JulgamentoService,
    private _matDialog: MatDialog,
    public sanitizer: DomSanitizer,
    private _fuseDrawerService: FuseDrawerService,
  ) { }

  ngOnInit(): void {
      this._processoService.listarProcessos().subscribe({
        next: (data) => {
            this.processos = data.map(processo => {
                this._processoService.obterDocumentosDoProcesso(processo.id).subscribe(documentos => {
                    this.documentos = documentos.map(documento => documento.nome);

                    var aux = this.documentos as unknown[];

                    processo.documentos = aux as Documento[];
                });

                let abreviacao: string;
                if(processo.abreviacao=="Mérito"){
                  abreviacao = `${processo.classe}-100`;
                }
                else abreviacao = `${processo.classe}-${processo.abreviacao}`;
                this._processoService.obterImpedimentosDoMinistro(abreviacao, "DT").subscribe(impedimentos=>{
                  this.impedimentos.push(impedimentos);
                })

                this.tags = processo.lista.map(tag => tag.descricao);

                var aux = this.tags as unknown[];

                processo.lista = aux as Tag[];

                return processo;
            });
        }
      });
      this._julgamentoService.listarTodasAsSessoesDeJulgamento().subscribe({
        next: (data) => {
            this.sessao = data[0];
        }
      });
  }

  abrirModal(impedimento: Impedimento){
    const dialogRef = this._matDialog.open(ImpedimentoComponent, {
      data: impedimento,
    });
  }

  eventsSubject: Subject<any> = new Subject<any>();

}
