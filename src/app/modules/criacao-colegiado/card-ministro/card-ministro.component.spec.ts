import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMinistroComponent } from './card-ministro.component';

describe('CardMinistroComponent', () => {
  let component: CardMinistroComponent;
  let fixture: ComponentFixture<CardMinistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMinistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMinistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
