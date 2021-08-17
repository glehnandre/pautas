import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessoesJulgamentosComponent } from './sessoes-julgamentos/sessoes-julgamentos.component';

describe('SessoesJulgamentosComponent', () => {
  let component: SessoesJulgamentosComponent;
  let fixture: ComponentFixture<SessoesJulgamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessoesJulgamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessoesJulgamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
