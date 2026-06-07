import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalibanComponent } from './taliban.component';

describe('TalibanComponent', () => {
  let component: TalibanComponent;
  let fixture: ComponentFixture<TalibanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalibanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalibanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
