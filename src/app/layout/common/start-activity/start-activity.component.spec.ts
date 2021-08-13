import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartActivityComponent } from './start-activity.component';

describe('StartActivityComponent', () => {
  let component: StartActivityComponent;
  let fixture: ComponentFixture<StartActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
