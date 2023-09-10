import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDaysComponent } from './open-days.component';

describe('OpenDaysComponent', () => {
  let component: OpenDaysComponent;
  let fixture: ComponentFixture<OpenDaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenDaysComponent]
    });
    fixture = TestBed.createComponent(OpenDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
