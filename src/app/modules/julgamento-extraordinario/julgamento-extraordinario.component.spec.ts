import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JulgamentoExtraordinarioComponent } from './julgamento-extraordinario.component';

describe('JulgamentoExtraordinarioComponent', () => {
  let component: JulgamentoExtraordinarioComponent;
  let fixture: ComponentFixture<JulgamentoExtraordinarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JulgamentoExtraordinarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JulgamentoExtraordinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
