import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSentenciaComponent } from './chat-sentencia.component';

describe('ChatSentenciaComponent', () => {
  let component: ChatSentenciaComponent;
  let fixture: ComponentFixture<ChatSentenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatSentenciaComponent]
    });
    fixture = TestBed.createComponent(ChatSentenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
