import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotoDosMinistrosComponent } from './voto-dos-ministros.component';

describe('VotoDosMinistrosComponent', () => {
  let component: VotoDosMinistrosComponent;
  let fixture: ComponentFixture<VotoDosMinistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotoDosMinistrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotoDosMinistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
