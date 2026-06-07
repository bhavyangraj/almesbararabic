import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentSpeechComponent } from './president-speech.component';

describe('PresidentSpeechComponent', () => {
  let component: PresidentSpeechComponent;
  let fixture: ComponentFixture<PresidentSpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentSpeechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
