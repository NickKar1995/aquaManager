import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateBoxComponent } from './date-box.component';

describe('DateBoxComponent', () => {
  let component: DateBoxComponent;
  let fixture: ComponentFixture<DateBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
