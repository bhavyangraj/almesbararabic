import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonsearchComponent } from './commonsearch.component';

describe('CommonsearchComponent', () => {
  let component: CommonsearchComponent;
  let fixture: ComponentFixture<CommonsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonsearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
