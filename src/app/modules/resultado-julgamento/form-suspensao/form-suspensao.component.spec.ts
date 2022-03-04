import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSuspensaoComponent } from './form-suspensao.component';

describe('FormSuspensaoComponent', () => {
  let component: FormSuspensaoComponent;
  let fixture: ComponentFixture<FormSuspensaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSuspensaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSuspensaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
