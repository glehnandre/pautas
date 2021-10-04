import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDecisaoComponent } from './form-decisao.component';

describe('FormDecisaoComponent', () => {
  let component: FormDecisaoComponent;
  let fixture: ComponentFixture<FormDecisaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDecisaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDecisaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
