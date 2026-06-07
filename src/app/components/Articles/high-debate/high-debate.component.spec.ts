import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighDebateComponent } from './high-debate.component';

describe('HighDebateComponent', () => {
  let component: HighDebateComponent;
  let fixture: ComponentFixture<HighDebateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighDebateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighDebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
