import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlayerMinComponent } from './audio-player-min.component';

describe('AudioPlayerMinComponent', () => {
  let component: AudioPlayerMinComponent;
  let fixture: ComponentFixture<AudioPlayerMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioPlayerMinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioPlayerMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
