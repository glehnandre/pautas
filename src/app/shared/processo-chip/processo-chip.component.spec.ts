import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoChipComponent } from './processo-chip.component';

describe('ProcessoChipComponent', () => {
  let component: ProcessoChipComponent;
  let fixture: ComponentFixture<ProcessoChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessoChipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessoChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
