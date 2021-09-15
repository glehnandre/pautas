import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizadorPdfComponent } from './visualizador-pdf.component';

describe('VisualizadorPdfComponent', () => {
  let component: VisualizadorPdfComponent;
  let fixture: ComponentFixture<VisualizadorPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizadorPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizadorPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
