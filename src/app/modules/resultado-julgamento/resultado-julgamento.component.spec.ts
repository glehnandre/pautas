import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoJulgamentoComponent } from './resultado-julgamento.component';

describe('ResultadoJulgamentoComponent', () => {
  let component: ResultadoJulgamentoComponent;
  let fixture: ComponentFixture<ResultadoJulgamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoJulgamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoJulgamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
