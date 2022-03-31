import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoAdicionarDocumentoComponent } from './dialogo-adicionar-documento.component';

describe('DialogoAdicionarDocumentoComponent', () => {
  let component: DialogoAdicionarDocumentoComponent;
  let fixture: ComponentFixture<DialogoAdicionarDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoAdicionarDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoAdicionarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
