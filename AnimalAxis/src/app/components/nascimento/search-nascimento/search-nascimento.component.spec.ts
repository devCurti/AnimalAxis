import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNascimentoComponent } from './search-nascimento.component';

describe('SearchNascimentoComponent', () => {
  let component: SearchNascimentoComponent;
  let fixture: ComponentFixture<SearchNascimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchNascimentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchNascimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
