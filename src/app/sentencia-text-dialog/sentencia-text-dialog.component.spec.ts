import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenciaTextDialogComponent } from './sentencia-text-dialog.component';

describe('SentenciaTextDialogComponent', () => {
  let component: SentenciaTextDialogComponent;
  let fixture: ComponentFixture<SentenciaTextDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SentenciaTextDialogComponent]
    });
    fixture = TestBed.createComponent(SentenciaTextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
