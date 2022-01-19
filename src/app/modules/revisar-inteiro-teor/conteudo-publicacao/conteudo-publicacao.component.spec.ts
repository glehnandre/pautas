import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteudoPublicacaoComponent } from './conteudo-publicacao.component';

describe('ConteudoPublicacaoComponent', () => {
  let component: ConteudoPublicacaoComponent;
  let fixture: ComponentFixture<ConteudoPublicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConteudoPublicacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConteudoPublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
