import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpedimentoComponent } from './impedimento.component';

describe('ImpedimentoComponent', () => {
  let component: ImpedimentoComponent;
  let fixture: ComponentFixture<ImpedimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpedimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpedimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
