import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRelatorComponent } from './form-relator.component';

describe('FormRelatorComponent', () => {
  let component: FormRelatorComponent;
  let fixture: ComponentFixture<FormRelatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRelatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRelatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
