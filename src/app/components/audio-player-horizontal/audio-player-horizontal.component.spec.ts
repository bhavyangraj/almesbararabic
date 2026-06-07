import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlayerHorizontalComponent } from './audio-player-horizontal.component';

describe('AudioPlayerHorizontalComponent', () => {
  let component: AudioPlayerHorizontalComponent;
  let fixture: ComponentFixture<AudioPlayerHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioPlayerHorizontalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioPlayerHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
