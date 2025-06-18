import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDateLayoutComponent } from './grid-date-layout.component';

describe('GridDateLayoutComponent', () => {
  let component: GridDateLayoutComponent;
  let fixture: ComponentFixture<GridDateLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridDateLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDateLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
