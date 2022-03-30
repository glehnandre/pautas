import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesSessaoComponent } from './detalhes-sessao.component';

describe('DetalhesSessaoComponent', () => {
  let component: DetalhesSessaoComponent;
  let fixture: ComponentFixture<DetalhesSessaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesSessaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
