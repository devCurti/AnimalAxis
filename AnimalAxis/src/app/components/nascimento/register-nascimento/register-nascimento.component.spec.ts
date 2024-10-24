import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNascimentoComponent } from './register-nascimento.component';

describe('RegisterNascimentoComponent', () => {
  let component: RegisterNascimentoComponent;
  let fixture: ComponentFixture<RegisterNascimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterNascimentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterNascimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
