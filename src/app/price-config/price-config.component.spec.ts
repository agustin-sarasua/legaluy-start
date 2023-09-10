import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceConfigComponent } from './price-config.component';

describe('PriceConfigComponent', () => {
  let component: PriceConfigComponent;
  let fixture: ComponentFixture<PriceConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceConfigComponent]
    });
    fixture = TestBed.createComponent(PriceConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
