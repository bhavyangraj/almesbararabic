import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiesInToleranceComponent } from './studies-in-tolerance.component';

describe('StudiesInToleranceComponent', () => {
  let component: StudiesInToleranceComponent;
  let fixture: ComponentFixture<StudiesInToleranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudiesInToleranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudiesInToleranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
