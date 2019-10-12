import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor(private router: Router) {
  }

  joinRoom(data) {
    this.socket.emit('join', data);

    return new Observable<{ isReady: boolean }>(observer => {
      this.socket.on('room ready', (res) => {
        observer.next(res);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  connect(): void {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => {
      this.socket
        .emit('authenticate', { token });
    });

    this.socket.on('unauthorized', (error, callback) => {
      console.log('unathorized');
      this.router.navigate(['']);
    });


  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  receivedMessage() {
    return new Observable<any>(observer => {
      this.socket.on('new message', data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  typing(data) {
    this.socket.emit('typing', data);
  }

  receivedTyping() {
    return new Observable<{ isTyping: boolean }>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
