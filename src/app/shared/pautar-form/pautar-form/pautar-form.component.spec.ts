import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PautarFormComponent } from './pautar-form.component';

describe('PautarFormComponent', () => {
  let component: PautarFormComponent;
  let fixture: ComponentFixture<PautarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PautarFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PautarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
