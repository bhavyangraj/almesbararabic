import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcharesultsComponent } from './searcharesults.component';

describe('SearcharesultsComponent', () => {
  let component: SearcharesultsComponent;
  let fixture: ComponentFixture<SearcharesultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearcharesultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearcharesultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
