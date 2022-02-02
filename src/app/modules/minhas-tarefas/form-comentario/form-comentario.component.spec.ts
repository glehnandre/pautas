import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComentarioComponent } from './form-comentario.component';

describe('FormComentarioComponent', () => {
  let component: FormComentarioComponent;
  let fixture: ComponentFixture<FormComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComentarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
