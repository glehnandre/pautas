import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirDocumentoComponent } from './incluir-documento.component';

describe('IncluirDocumentoComponent', () => {
  let component: IncluirDocumentoComponent;
  let fixture: ComponentFixture<IncluirDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncluirDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluirDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
