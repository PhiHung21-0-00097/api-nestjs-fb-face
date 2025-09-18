// src/modules/chat/chat.service.ts
import { Injectable } from '@nestjs/common';

interface Message {
  roomId: string;
  senderId: string;
  message: string;
  timestamp: Date;
}

@Injectable()
export class ChatService {
  private messages: Message[] = [];

  saveMessage(roomId: string, senderId: string, message: string) {
    const msg = { roomId, senderId, message, timestamp: new Date() };
    this.messages.push(msg);
    return msg;
  }

  getMessages(roomId: string) {
    return this.messages.filter((m) => m.roomId === roomId);
  }
}
