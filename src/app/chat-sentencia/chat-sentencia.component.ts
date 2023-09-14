import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { BackendService } from '../backend.service';
import { GlobalService } from '../global.service';
import { Conversation, Message, SearchForm, Sentencia } from '../models/model';

@Component({
  selector: 'app-chat-sentencia',
  templateUrl: './chat-sentencia.component.html',
  styleUrls: ['./chat-sentencia.component.css']
})
export class ChatSentenciaComponent implements OnChanges{
  @Input() sentencia: Sentencia | undefined;
  @Input() messages: string[] = [];

  // messages: string[] = [];
  newMessage: string = '';

  constructor(public auth: AuthService, private http: HttpClient, public backend: BackendService, public globalService: GlobalService) { 
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sentencia']) {
      console.log('sentencia changed:', this.sentencia);
      // this.messages = [];
    }
    if (changes['messages']) {
      console.log('messages changed:', this.messages);
    }
  }
  
  sendMessage() {
      this.saveForm()
  }

  saveForm(): void {
    if (this.newMessage.trim() !== '') {
        this.globalService.showLoading();
        this.messages.push(this.newMessage)
        // const messageList: Message[] = this.messages.map((messageString, index) => {
        //   const role = index % 2 === 0 ? 'user' : 'assistant'; // Assign 'user' or 'assistant' based on index
        //   return { role, text: messageString } as Message;
        // });

        const message: Message = {
          role: 'user',
          text: this.newMessage
        }
        const messageList: Message[] = [message]
        const conversation: Conversation = {
          messages: messageList,
          sentencia_model: this.sentencia
        };

        this.globalService.showLoading();
        this.newMessage = '';
        this.backend.chat(conversation).subscribe({
          next: (data) => {
            console.log(data);
            this.messages.push(data);
            
            this.globalService.showLoading();
          },
          error: (error) => {
            console.error('Error:', error);
            this.globalService.hideLoading();
            if (error.status === 400) {
              alert(error.error); // Assuming the error object has a "message" property
            }
          },
          complete: () => {
            console.log('Completed');
            this.globalService.hideLoading();
          }
        });
      
        
      }
    }
  
}
