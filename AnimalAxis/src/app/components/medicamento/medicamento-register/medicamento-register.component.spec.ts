import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoRegisterComponent } from './medicamento-register.component';

describe('MedicamentoRegisterComponent', () => {
  let component: MedicamentoRegisterComponent;
  let fixture: ComponentFixture<MedicamentoRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicamentoRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicamentoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
