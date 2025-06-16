import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotAnalysisComponent } from './pivot-analysis.component';

describe('PivotAnalysisComponent', () => {
  let component: PivotAnalysisComponent;
  let fixture: ComponentFixture<PivotAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PivotAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PivotAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
