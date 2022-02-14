import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FuseDrawerService } from '@fuse/components/drawer';
import { AlertaService } from 'app/modules/services/alerta.service';
import { ProcessoService } from 'app/modules/services/processo.service';
import { Documento } from 'app/shared/model/interfaces/documento.interface';
import { Processo } from 'app/shared/model/interfaces/processo.interface';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';




@Component({
  selector: 'app-linha',
  templateUrl: './linha.component.html',
  styleUrls: ['./linha.component.scss']
})
export class LinhaComponent implements OnInit {
  @Output() display: boolean = false;
  @Output() mobile: boolean = false;
  @Output() checked = new EventEmitter<Processo>();
  @Output() tagSelecionada = new EventEmitter();
  @Output() statusSelecionado = new EventEmitter();
  @Input() idLinha: number;

  @Input() selected: boolean;
  @Input() processo: Processo;

  docs$: Observable<Documento[]>;

  panelOpenState = false;

  lastId: string = 'idTags';
  link: SafeResourceUrl;

  errorMessage: string;

  constructor(
      private _processoService: ProcessoService,
      public _sanitizer: DomSanitizer,
      private _fuseDrawerService: FuseDrawerService,
      private _alertaService: AlertaService,
  ) {


    if (document.body.clientWidth <= 1000) {
      this.mobile = !this.mobile;
    }
  }

  ngOnInit(): void {
    this.link = this._sanitizer.bypassSecurityTrustResourceUrl('');
    this.docs$ = this._processoService.obterDocumentosDoProcesso(this.processo.id).pipe(
      catchError(error => {
        console.log(error);
        this.errorMessage =  error.message;
        this._alertaService.exibirAlerta("Error")
        return EMPTY;
      })
    );;

    this._processoService.obterProcessosSelecionados().subscribe((data) => {
        this.selected = false;
        const newList = new Set(data);
        newList.forEach((p) => {
          if (p.id === this.processo.id)
            {this.processo.checked = true;}
        });
    });
  }

  emiteStatusDoCheckbox(status: MatCheckboxChange): void {
    this.processo.checked = status.checked;
    this.checked.emit(this.processo);
  }

  filtrarPorStatus(status): void {
    this.statusSelecionado.emit(status);
  }

  filtrarPorTags(tag): void {
    this.tagSelecionada.emit(tag);
  }

  onResize(): void {
    if (document.body.clientWidth <= 1000) {
      this.mobile = true;
    }
    else {
      this.mobile = false;
    }
  }

  abrirLink(link: string): void {
    if (link !== this.link) {
      this.link = this._sanitizer.bypassSecurityTrustResourceUrl(link);
    }
  }
}
