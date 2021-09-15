import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecalhoRelatorComponent } from './cabecalho-relator.component';

describe('CabecalhoRelatorComponent', () => {
  let component: CabecalhoRelatorComponent;
  let fixture: ComponentFixture<CabecalhoRelatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabecalhoRelatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecalhoRelatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
