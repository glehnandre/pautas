import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { JulgamentoService } from 'app/modules/services/julgamento.service';
import { MinistroService } from 'app/modules/services/ministro.service';
import { EMPTY, Observable } from 'rxjs';

import { FiltroDialogComponent } from './filtro-dialog.component';

class MockMinistroService {
  listarMinistrosDoColegiado(): Observable<any> {return EMPTY}
}

class MockJulgamentoService {
  public listarSessoesDeJulgamento(): Observable<any> { return EMPTY };
}

const MockActivatedRoute = {
  snapshot: {
    queryParams: {
      numero: 1000,
      ano: 2021,
    }
  }
}

describe('FiltroDialogComponent', () => {
  let component: FiltroDialogComponent;
  let fixture: ComponentFixture<FiltroDialogComponent>;
  let julgamentoService: JulgamentoService;
  let fb: FormBuilder;
  let route: ActivatedRoute;
  let ministroService: MinistroService;
  //component.data.filtros = { termo: '', relatoria: [], listas: [], temas: [], classes: []};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroDialogComponent ],
      providers: [
        { provide: JulgamentoService, useClass: MockJulgamentoService },
        { provide: MinistroService, useClass: MockMinistroService },
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: ActivatedRoute, useValue:  MockActivatedRoute},
        { provide: MatDialogRef, useValue: {} },
	      { provide: MAT_DIALOG_DATA, useValue: [] },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroDialogComponent);
    component = fixture.componentInstance;
    julgamentoService = TestBed.inject(JulgamentoService);
    fb = TestBed.inject(FormBuilder);
    ministroService = TestBed.inject(MinistroService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve encontrar a sessão de julgamento com numero 1000 e ano 2021', () => {
    component.queryParams = {
      numero: 1000,
      ano: 2021,
    };
    
    MockActivatedRoute.snapshot.queryParams = component.queryParams;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
