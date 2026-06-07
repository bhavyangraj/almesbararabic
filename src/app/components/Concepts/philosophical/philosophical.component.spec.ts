import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhilosophicalComponent } from './philosophical.component';

describe('PhilosophicalComponent', () => {
  let component: PhilosophicalComponent;
  let fixture: ComponentFixture<PhilosophicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhilosophicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhilosophicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
