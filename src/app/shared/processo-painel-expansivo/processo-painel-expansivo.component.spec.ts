import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoPainelExpansivoComponent } from './processo-painel-expansivo.component';

describe('ProcessoPainelExpansivoComponent', () => {
  let component: ProcessoPainelExpansivoComponent;
  let fixture: ComponentFixture<ProcessoPainelExpansivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessoPainelExpansivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessoPainelExpansivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
