import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortalitiesComponent } from './mortalities.component';

describe('MortalitiesComponent', () => {
  let component: MortalitiesComponent;
  let fixture: ComponentFixture<MortalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortalitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
