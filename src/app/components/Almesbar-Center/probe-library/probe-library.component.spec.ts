import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbeLibraryComponent } from './probe-library.component';

describe('ProbeLibraryComponent', () => {
  let component: ProbeLibraryComponent;
  let fixture: ComponentFixture<ProbeLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbeLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbeLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
