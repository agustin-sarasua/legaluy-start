import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BjnSearchResultsComponent } from './bjn-search-results.component';

describe('BjnSearchResultsComponent', () => {
  let component: BjnSearchResultsComponent;
  let fixture: ComponentFixture<BjnSearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BjnSearchResultsComponent]
    });
    fixture = TestBed.createComponent(BjnSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
