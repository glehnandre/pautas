import { Component, Input, OnInit } from '@angular/core';
import { ProcessoService } from 'app/modules/services/processo.service';
import { StatusProcesso } from './situacaoProcesso';

interface Status {
  id: number;
  color: string;
  status?: StatusProcesso;
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() display: boolean;
  @Input() mobile: boolean;
  @Input() idProcesso: number;

  status: Status[] = [
    { id: 1, color: "#3C8D40",  },
    { id: 2, color: "#FDC02F",  },
    { id: 3, color: "#BF221o",  },
    { id: 4, color: "#872FA6",  },
    { id: 5, color: "#1170A6",  },
    { id: 6, color: "#3434AC",  },
    { id: 7, color: "#A3F4F6",  },
  ]

  situacaoProcesso: Status;

  constructor(
    private _processoService: ProcessoService,
  ) {}

  ngOnInit(): void {
    this._processoService.obterStatusDoProcesso(this.idProcesso).subscribe({
      next: (status) => {
        this.situacaoProcesso = {
          id: status.situacao.id,
          color: this.status.find(situacao => situacao.id === status.situacao.id).color,
          status,
        }
      },
    });
  }

  print() {
    console.log(this.display)
  }
}
