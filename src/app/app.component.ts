import { Component, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './models/chat.model';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private chatService: ChatService) { }

  @ViewChild('input') input: any;

  messages$ = new Observable<any[]>();

  room: string = '';
  user: string = '';
  text: string = '';

  ngOnInit() {
    this.messages$ = this.chatService.getMessage();
    this.messages$.subscribe((data: any) => {
      window.location.href = '#message';
    })
  }

  ngAferViewInit() {
    this.input.nativeElement.scrollIntoView();
  }

  sendMessage() {
    if (this.text === '') {
      return;
    }

    let message: Message = {
      roomId: this.room,
      from: this.user,
      text: this.text.replace(/(\r\n|\n|\r)/gm, ''),
      date: Date.now().toString()
    }

    this.chatService.sendMessage(message);
    this.text = '';
  }

  joinRoom() {
    if (this.room === '') {
      return;
    }
    this.chatService.joinRoom(this.room);
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

}
