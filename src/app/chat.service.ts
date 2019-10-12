import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  public getUsers() {
    return this.http.get(`${serverUrl}/users`);
  }

  public getRoomHistory(room) {
    return this.http.get('http://localhost:3000/chatroom/' + room);
  }
}
