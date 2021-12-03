import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarInteiroTeorComponent } from './revisar-inteiro-teor.component';

describe('RevisarInteiroTeorComponent', () => {
  let component: RevisarInteiroTeorComponent;
  let fixture: ComponentFixture<RevisarInteiroTeorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisarInteiroTeorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarInteiroTeorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
