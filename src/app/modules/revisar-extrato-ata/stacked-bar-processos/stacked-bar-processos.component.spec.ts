import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedBarProcessosComponent } from './stacked-bar-processos.component';

describe('StackedBarProcessosComponent', () => {
  let component: StackedBarProcessosComponent;
  let fixture: ComponentFixture<StackedBarProcessosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackedBarProcessosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedBarProcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
