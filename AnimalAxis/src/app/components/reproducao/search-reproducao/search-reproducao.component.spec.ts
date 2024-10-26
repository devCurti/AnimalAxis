import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReproducaoComponent } from './search-reproducao.component';

describe('SearchReproducaoComponent', () => {
  let component: SearchReproducaoComponent;
  let fixture: ComponentFixture<SearchReproducaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchReproducaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchReproducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
