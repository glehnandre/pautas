import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconesVotosComponent } from './icones-votos.component';

describe('IconesVotosComponent', () => {
  let component: IconesVotosComponent;
  let fixture: ComponentFixture<IconesVotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconesVotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconesVotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
