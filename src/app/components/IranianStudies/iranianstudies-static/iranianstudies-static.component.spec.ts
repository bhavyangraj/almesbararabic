import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IranianstudiesStaticComponent } from './iranianstudies-static.component';

describe('IranianstudiesStaticComponent', () => {
  let component: IranianstudiesStaticComponent;
  let fixture: ComponentFixture<IranianstudiesStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IranianstudiesStaticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IranianstudiesStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
