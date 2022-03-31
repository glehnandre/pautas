import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoIncluirDocumentoComponent } from './dialogo-incluir-documento.component';

describe('DialogoIncluirDocumentoComponent', () => {
  let component: DialogoIncluirDocumentoComponent;
  let fixture: ComponentFixture<DialogoIncluirDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoIncluirDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoIncluirDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
