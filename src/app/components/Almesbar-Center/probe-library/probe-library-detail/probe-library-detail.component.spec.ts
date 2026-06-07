import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbeLibraryDetailComponent } from './probe-library-detail.component';

describe('ProbeLibraryDetailComponent', () => {
  let component: ProbeLibraryDetailComponent;
  let fixture: ComponentFixture<ProbeLibraryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbeLibraryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbeLibraryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
