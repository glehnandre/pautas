import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { MinistroService } from '../services/ministro.service';

import { CriacaoColegiadoComponent } from './criacao-colegiado.component';

class MockMinistroService {
  listarMinistros(): Observable<any> {return EMPTY}
  listarColegiados(): Observable<any> {return EMPTY}
}

describe('CriacaoColegiadoComponent', () => {
  let component: CriacaoColegiadoComponent;
  let fixture: ComponentFixture<CriacaoColegiadoComponent>;
  let fb: FormBuilder;
  let route: ActivatedRoute;
  let ministroService: MinistroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriacaoColegiadoComponent ],
      providers: [
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: MinistroService, useClass: MockMinistroService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriacaoColegiadoComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    ministroService = TestBed.inject(MinistroService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve testar o numero minimo de votos', () => {
    component.votosDosMinistros = [];
    fixture.detectChanges();
    expect(component.votosDosMinistros.length).toBeLessThan(5);
  });

  it('Deve testar se há um relator', () => {
    component.votosDosMinistros = [{
      incluir_voto: false,
      ja_votou: false,
      ministro: null,
      pode_votar: false,
      relator: true,
    }];
    fixture.detectChanges();
    expect(component.votosDosMinistros[0].relator).toBeTrue();
  });
});
