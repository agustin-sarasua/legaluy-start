import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-sentencia',
  templateUrl: './chat-sentencia.component.html',
  styleUrls: ['./chat-sentencia.component.css']
})
export class ChatSentenciaComponent {
  messages: string[] = [];
  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push(this.newMessage);
      this.newMessage = '';
    }
  }
}
