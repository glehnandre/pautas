import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizadorInteiroTeorComponent } from './visualizador-inteiro-teor.component';

describe('VisualizadorInteiroTeorComponent', () => {
  let component: VisualizadorInteiroTeorComponent;
  let fixture: ComponentFixture<VisualizadorInteiroTeorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizadorInteiroTeorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizadorInteiroTeorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
