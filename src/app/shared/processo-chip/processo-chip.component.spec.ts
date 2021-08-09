import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessoService } from 'app/modules/services/processo.service';

import { ProcessoChipComponent } from './processo-chip.component';

class MockProcessoService {

}

describe('ProcessoChipComponent', () => {
  let component: ProcessoChipComponent;
  let fixture: ComponentFixture<ProcessoChipComponent>;
  let processoService: ProcessoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessoChipComponent ],
      providers: [
        { provide: ProcessoService, useClass:  MockProcessoService},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessoChipComponent);
    component = fixture.componentInstance;
    processoService = TestBed.inject(ProcessoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
