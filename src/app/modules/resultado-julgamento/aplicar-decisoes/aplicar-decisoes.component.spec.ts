import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicarDecisoesComponent } from './aplicar-decisoes.component';

describe('AplicarDecisoesComponent', () => {
  let component: AplicarDecisoesComponent;
  let fixture: ComponentFixture<AplicarDecisoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AplicarDecisoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicarDecisoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
