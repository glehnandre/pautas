import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteudoVotoMinistroComponent } from './conteudo-voto-ministro.component';

describe('ConteudoVotoMinistroComponent', () => {
  let component: ConteudoVotoMinistroComponent;
  let fixture: ComponentFixture<ConteudoVotoMinistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConteudoVotoMinistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConteudoVotoMinistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
