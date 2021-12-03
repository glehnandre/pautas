import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoAtaComponent } from './extrato-ata.component';

describe('ExtratoAtaComponent', () => {
  let component: ExtratoAtaComponent;
  let fixture: ComponentFixture<ExtratoAtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtratoAtaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtratoAtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
