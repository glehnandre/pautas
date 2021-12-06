import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarSessaoJulgamentoComponent } from './finalizar-sessao-julgamento.component';

describe('FinalizarSessaoJulgamentoComponent', () => {
  let component: FinalizarSessaoJulgamentoComponent;
  let fixture: ComponentFixture<FinalizarSessaoJulgamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizarSessaoJulgamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarSessaoJulgamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
