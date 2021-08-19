import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { CardMinistroComponent } from './card-ministro.component';

describe('CardMinistroComponent', () => {
  let component: CardMinistroComponent;
  let fixture: ComponentFixture<CardMinistroComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMinistroComponent ],
      providers: [
        { provide: FormBuilder, useClass: FormBuilder },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMinistroComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);

    component.minsitro = {
      id: 0,
      nome: '',
      cadeira: null,
      abreviacao: '',
    };

    component.composicao = {
      ministro: null,
      incluir_voto: false,
      ja_votou: false,
      pode_votar: false,
      presidente: false,
    };

    component.colegiado = '';
    component.statusVotacao = null;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
