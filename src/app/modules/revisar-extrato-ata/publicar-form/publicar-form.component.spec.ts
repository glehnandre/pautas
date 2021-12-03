import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarFormComponent } from './publicar-form.component';

describe('PublicarFormComponent', () => {
  let component: PublicarFormComponent;
  let fixture: ComponentFixture<PublicarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicarFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
