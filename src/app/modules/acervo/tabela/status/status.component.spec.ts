import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StatusComponent } from './status.component';

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve recuperar apenas o status', () => {
    component.situacaoProcesso = {
      id: 0, 
      color: '#fff', 
      status: { 
        situacao: {id: 1, nome: 'Apto a Pautar'}, 
        complemento: '', 
        descricao: '' ,
      },
    };

    const status = fixture.debugElement.queryAll(By.css('#status-processo'));

    expect(status[0].nativeElement.textContent.trim()).toEqual('Apto a Pautar');
  });
});
