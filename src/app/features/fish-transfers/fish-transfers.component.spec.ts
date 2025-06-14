import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishTransfersComponent } from './fish-transfers.component';

describe('FishTransfersComponent', () => {
  let component: FishTransfersComponent;
  let fixture: ComponentFixture<FishTransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FishTransfersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
