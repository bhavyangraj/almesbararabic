import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalPagesComponent } from './internal-pages.component';

describe('InternalPagesComponent', () => {
  let component: InternalPagesComponent;
  let fixture: ComponentFixture<InternalPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalPagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InternalPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
