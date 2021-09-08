import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoCapituloComponent } from './processo-capitulo.component';

describe('ProcessoCapituloComponent', () => {
  let component: ProcessoCapituloComponent;
  let fixture: ComponentFixture<ProcessoCapituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessoCapituloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessoCapituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
