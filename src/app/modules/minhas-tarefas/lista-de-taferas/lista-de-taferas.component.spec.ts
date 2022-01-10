import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeTaferasComponent } from './lista-de-taferas.component';

describe('ListaDeTaferasComponent', () => {
  let component: ListaDeTaferasComponent;
  let fixture: ComponentFixture<ListaDeTaferasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDeTaferasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeTaferasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
