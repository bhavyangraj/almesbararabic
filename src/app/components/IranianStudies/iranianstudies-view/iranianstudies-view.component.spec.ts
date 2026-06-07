import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IranianstudiesViewComponent } from './iranianstudies-view.component';

describe('IranianstudiesViewComponent', () => {
  let component: IranianstudiesViewComponent;
  let fixture: ComponentFixture<IranianstudiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IranianstudiesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IranianstudiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
