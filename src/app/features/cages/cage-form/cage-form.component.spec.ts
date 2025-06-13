import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CageFormComponent } from './cage-form.component';

describe('CageFormComponent', () => {
  let component: CageFormComponent;
  let fixture: ComponentFixture<CageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CageFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
