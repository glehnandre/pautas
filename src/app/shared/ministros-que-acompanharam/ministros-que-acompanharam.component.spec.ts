import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistrosQueAcompanharamComponent } from './ministros-que-acompanharam.component';

describe('MinistrosQueAcompanharamComponent', () => {
  let component: MinistrosQueAcompanharamComponent;
  let fixture: ComponentFixture<MinistrosQueAcompanharamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinistrosQueAcompanharamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistrosQueAcompanharamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
