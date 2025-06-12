import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishStockingComponent } from './fish-stocking.component';

describe('FishStockingComponent', () => {
  let component: FishStockingComponent;
  let fixture: ComponentFixture<FishStockingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FishStockingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishStockingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
