import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoSearchComponent } from './medicamento-search.component';

describe('MedicamentoSearchComponent', () => {
  let component: MedicamentoSearchComponent;
  let fixture: ComponentFixture<MedicamentoSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicamentoSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicamentoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
