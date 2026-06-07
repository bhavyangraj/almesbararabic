import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IranianstudiesComponent } from './iranianstudies.component';

describe('IranianstudiesComponent', () => {
  let component: IranianstudiesComponent;
  let fixture: ComponentFixture<IranianstudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IranianstudiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IranianstudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
