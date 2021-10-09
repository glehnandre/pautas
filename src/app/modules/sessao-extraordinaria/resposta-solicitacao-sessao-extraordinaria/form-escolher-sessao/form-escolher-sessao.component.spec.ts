import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEscolherSessaoComponent } from './form-escolher-sessao.component';

describe('FormEscolherSessaoComponent', () => {
  let component: FormEscolherSessaoComponent;
  let fixture: ComponentFixture<FormEscolherSessaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEscolherSessaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEscolherSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
