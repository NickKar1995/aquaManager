import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyStockBalanceComponent } from './daily-stock-balance.component';

describe('DailyStockBalanceComponent', () => {
  let component: DailyStockBalanceComponent;
  let fixture: ComponentFixture<DailyStockBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyStockBalanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyStockBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
