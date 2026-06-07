import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicsViewComponent } from './infographics-view.component';

describe('InfographicsViewComponent', () => {
  let component: InfographicsViewComponent;
  let fixture: ComponentFixture<InfographicsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfographicsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfographicsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
