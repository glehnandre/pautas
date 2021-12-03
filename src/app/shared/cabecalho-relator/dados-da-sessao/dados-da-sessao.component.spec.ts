import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosDaSessaoComponent } from './dados-da-sessao.component';

describe('DadosDaSessaoComponent', () => {
  let component: DadosDaSessaoComponent;
  let fixture: ComponentFixture<DadosDaSessaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosDaSessaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosDaSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
