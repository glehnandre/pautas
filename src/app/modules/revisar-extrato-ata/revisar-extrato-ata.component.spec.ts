import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarExtratoAtaComponent } from './revisar-extrato-ata.component';

describe('RevisarExtratoAtaComponent', () => {
  let component: RevisarExtratoAtaComponent;
  let fixture: ComponentFixture<RevisarExtratoAtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisarExtratoAtaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarExtratoAtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
