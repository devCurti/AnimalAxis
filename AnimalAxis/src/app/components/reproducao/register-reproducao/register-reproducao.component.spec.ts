import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterReproducaoComponent } from './register-reproducao.component';

describe('RegisterReproducaoComponent', () => {
  let component: RegisterReproducaoComponent;
  let fixture: ComponentFixture<RegisterReproducaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterReproducaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterReproducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
