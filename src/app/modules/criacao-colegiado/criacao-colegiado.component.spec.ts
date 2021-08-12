import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriacaoColegiadoComponent } from './criacao-colegiado.component';

describe('CriacaoColegiadoComponent', () => {
  let component: CriacaoColegiadoComponent;
  let fixture: ComponentFixture<CriacaoColegiadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriacaoColegiadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriacaoColegiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
