import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarSessaoComponent } from './alterar-sessao.component';

describe('AlterarSessaoComponent', () => {
  let component: AlterarSessaoComponent;
  let fixture: ComponentFixture<AlterarSessaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterarSessaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
