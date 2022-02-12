import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Documento } from "app/shared/model/interfaces/documento.interface";


@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<Documento>;
  @Output() checked = new EventEmitter();

  link: SafeResourceUrl;

  constructor(
    private _sanitize: DomSanitizer,
  ) {
    this.link = this._sanitize.bypassSecurityTrustResourceUrl('');
  }

  ngOnInit(): void {
  }

  abrirPdf(url: string): void {
    this.link = this._sanitize.bypassSecurityTrustResourceUrl(url);

    window.open(this.link['changingThisBreaksApplicationSecurity'], "_blank");
  }

  emiteStatusDoCheckbox(documento: Documento): void {
    this.checked.emit(documento);
  }
}
