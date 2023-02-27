import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Subject } from 'rxjs';
import { Message } from '../models/chat.model';


@Injectable({
  providedIn: 'root'
})

export class ChatService {

  messages$ = new Subject<any[]>();
  messages: any[] = [];

  constructor(private socket: Socket) {
    this.socket.on('join', (data: any) => {
      this.messages = data;
      this.messages$.next(this.messages);
    });
    this.socket.on('message', (data: any) => {
      this.messages.push(data);
      this.messages$.next(this.messages);
    });
  }

  sendMessage(msg: Message) {
    this.socket.emit('message', msg);
  }

  joinRoom(room: string) {
    this.messages = [];
    this.messages$.next(this.messages);
    this.socket.emit('join', { id: room });
  }

  getMessage() {
    return this.messages$.asObservable();
  }
}
