import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorviewComponent } from './authorview.component';

describe('AuthorviewComponent', () => {
  let component: AuthorviewComponent;
  let fixture: ComponentFixture<AuthorviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
