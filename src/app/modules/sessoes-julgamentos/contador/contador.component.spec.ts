import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorComponent } from './contador.component';

describe('ContadorComponent', () => {
  let component: ContadorComponent;
  let fixture: ComponentFixture<ContadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve verificar que a sessão já começou', () => {
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - 3); // 3 dias

    component.sessao = {
      numero: 1000,
      ano: 2021,
      categoria: '',
      colegiado: '',
      data_inicio: String(dataInicio),
      data_fim: '',
      modalidade: '',
      tipo: '',
      situacao: 'ABERTA',
    };
    component.atualizaTempo();
    fixture.detectChanges();

    expect(component.comecou).toEqual(true);
  });

  it('Deve verificar se a sessão ainda não começou', () => {
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() + 3); // 3 dias

    component.sessao = {
        numero: 1000,
        ano: 2021,
        categoria: '',
        colegiado: '',
        data_inicio: String(dataInicio),
        data_fim: '',
        modalidade: '',
        tipo: '',
        situacao: 'ABERTA',
      };
      component.atualizaTempo();
      fixture.detectChanges();

    expect(component.comecou).toEqual(false);
  });

  it('Deve calcular o tempo correto faltante para sessão começar', () => {
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() + 3);           // 3 dias
    dataInicio.setTime(dataInicio.getTime() + 2 * 3600000); // 2 horas
    dataInicio.setTime(dataInicio.getTime() + 37 * 60000);  // 37 minutos
    dataInicio.setTime(dataInicio.getTime() + 48 * 1000);   // 48 segundos

    component.sessao = {
        numero: 1000,
        ano: 2021,
        categoria: '',
        colegiado: '',
        data_inicio: String(dataInicio),
        data_fim: '',
        modalidade: '',
        tipo: '',
        situacao: 'ABERTA',
    };
    component.atualizaTempo();
    fixture.detectChanges();

    expect(component.dias).toBe('03');
    expect(component.horas).toBe('02');
    expect(component.minutos).toBe('37');
    expect(component.segundos).toBe('47');
  });
});
