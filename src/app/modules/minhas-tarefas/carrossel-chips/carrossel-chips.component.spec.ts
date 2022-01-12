import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosselChipsComponent } from './carrossel-chips.component';

describe('CarrosselChipsComponent', () => {
  let component: CarrosselChipsComponent;
  let fixture: ComponentFixture<CarrosselChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrosselChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrosselChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
