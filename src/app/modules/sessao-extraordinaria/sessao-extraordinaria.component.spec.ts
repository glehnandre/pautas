import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoExtraordinariaComponent } from './sessao-extraordinaria.component';

describe('SessaoExtraordinariaComponent', () => {
  let component: SessaoExtraordinariaComponent;
  let fixture: ComponentFixture<SessaoExtraordinariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessaoExtraordinariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessaoExtraordinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
