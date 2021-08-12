import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessoesJulgamentoComponent } from './sessoes-julgamento.component';

describe('SessoesJulgamentoComponent', () => {
  let component: SessoesJulgamentoComponent;
  let fixture: ComponentFixture<SessoesJulgamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessoesJulgamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessoesJulgamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
