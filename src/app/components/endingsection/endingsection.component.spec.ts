import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndingsectionComponent } from './endingsection.component';

describe('EndingsectionComponent', () => {
  let component: EndingsectionComponent;
  let fixture: ComponentFixture<EndingsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndingsectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndingsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
