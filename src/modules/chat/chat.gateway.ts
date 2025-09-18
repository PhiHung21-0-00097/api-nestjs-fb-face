import {
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface MyJwtPayload extends JwtPayload {
  id: string;
}

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private onlineUsers = new Map<string, string>(); // userId -> socketId

  async handleConnection(client: Socket) {
    try {
      const token =
        (client.handshake.query.token as string) ||
        client.handshake.headers['authorization']?.split(' ')[1];
      if (!token) throw new Error('No token');

      // if (!token) {
      //   client.disconnect();
      //   return;
      // }

      const decoded = jwt.verify(
        token,
        'SECRET_KEY',
      ) as unknown as MyJwtPayload;
      // const userId = decoded.id;

      (client as any).user = decoded; //Gán user vào socket

      console.log(`✅ User connected: ${decoded.email}`);
      // this.onlineUsers.set(userId, client.id);

      // this.server.emit('online_users', Array.from(this.onlineUsers.keys()));

      // console.log(`User connected: ${userId}`);
    } catch (err) {
      console.log('❌ Unauthorized socket:', err.message);
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    let disconnectedUser: string | undefined;

    for (const [userId, socketId] of this.onlineUsers.entries()) {
      if (socketId === client.id) {
        disconnectedUser = userId;
        this.onlineUsers.delete(userId);
        break;
      }
    }
    this.server.emit('online_users', Array.from(this.onlineUsers.keys()));

    console.log(`User disconnected: ${disconnectedUser}`);
  }

  @SubscribeMessage('chat')
  async handleMessage(client: Socket, payload: { message: string }) {
    const user = (client as any).user;
    console.log(`💬 ${user.email}: ${payload.message}`);

    client.broadcast.emit('chat', {
      user: user.email,
      message: payload.message,
    });
  }
}
