import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessContactComponent } from './business-contact.component';

describe('BusinessContactComponent', () => {
  let component: BusinessContactComponent;
  let fixture: ComponentFixture<BusinessContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessContactComponent]
    });
    fixture = TestBed.createComponent(BusinessContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
