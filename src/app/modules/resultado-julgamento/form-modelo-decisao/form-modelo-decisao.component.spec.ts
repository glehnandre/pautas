import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModeloDecisaoComponent } from './form-modelo-decisao.component';

describe('FormModeloDecisaoComponent', () => {
  let component: FormModeloDecisaoComponent;
  let fixture: ComponentFixture<FormModeloDecisaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormModeloDecisaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModeloDecisaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
