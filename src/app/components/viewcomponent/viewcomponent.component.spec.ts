import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcomponentComponent } from './viewcomponent.component';

describe('ViewcomponentComponent', () => {
  let component: ViewcomponentComponent;
  let fixture: ComponentFixture<ViewcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
