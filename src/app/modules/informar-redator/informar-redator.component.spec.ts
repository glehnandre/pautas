import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformarRedatorComponent } from './informar-redator.component';

describe('InformarRedatorComponent', () => {
  let component: InformarRedatorComponent;
  let fixture: ComponentFixture<InformarRedatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformarRedatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformarRedatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
