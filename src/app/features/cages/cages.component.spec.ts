import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CagesComponent } from './cages.component';

describe('CagesComponent', () => {
  let component: CagesComponent;
  let fixture: ComponentFixture<CagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
