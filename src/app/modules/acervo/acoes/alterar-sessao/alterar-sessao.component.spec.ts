import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JulgamentoService } from 'app/modules/services/julgamento.service';

import { AlterarSessaoComponent } from './alterar-sessao.component';

describe('AlterarSessaoComponent', () => {
  let component: AlterarSessaoComponent;
  let fixture: ComponentFixture<AlterarSessaoComponent>;
  let httpClient: HttpClient;
  let service: JulgamentoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterarSessaoComponent ]
    })
    .compileComponents().then(() => {
      httpClient = TestBed.inject(HttpClient);
      service = TestBed.inject(JulgamentoService);
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    service = new JulgamentoService(httpClient);
    expect(component).toBeTruthy();
  });
});
