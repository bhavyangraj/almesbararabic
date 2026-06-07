import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbeInMediaComponent } from './probe-in-media.component';

describe('ProbeInMediaComponent', () => {
  let component: ProbeInMediaComponent;
  let fixture: ComponentFixture<ProbeInMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbeInMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbeInMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
