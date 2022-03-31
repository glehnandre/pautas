import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaDocumentoComponent } from './tabela-documento.component';

describe('TabelaDocumentoComponent', () => {
  let component: TabelaDocumentoComponent;
  let fixture: ComponentFixture<TabelaDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
