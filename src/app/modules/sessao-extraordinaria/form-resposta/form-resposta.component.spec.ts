import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRespostaComponent } from './form-resposta.component';

describe('FormRespostaComponent', () => {
  let component: FormRespostaComponent;
  let fixture: ComponentFixture<FormRespostaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRespostaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRespostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
