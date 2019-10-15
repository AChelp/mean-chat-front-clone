import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { SocketService } from '../socket.service';
import { first } from 'rxjs/operators';
import { serverUrl } from '../../constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() username;
  @Input() setActiveRoom;
  usersToShow;
  users;
  onlineUsers;
  userSearchQuery = '';
  isShowOnline = false;
  serverUrl = serverUrl;

  constructor(private chatService: ChatService, private socketService: SocketService) {
  }

  ngOnInit() {
    this.chatService.getUsers()
      .pipe(first())
      .subscribe((data: any) => {
        this.users = data.users.filter(user => user.name !== this.username);
        this.setActiveRoom(this.users.find(user => user.name === 'General room'));
        this.usersToShow = this.users;
        this.onlineUsers = data.onlineUsers;

        this.socketService.updateOnlineUsers().subscribe(usersOnline => {
          this.onlineUsers = usersOnline;
        });
      });
  }

  showAll() {
    this.isShowOnline = false;
    this.usersToShow = this.users;
  }

  showOnline() {
    this.isShowOnline = true;
    this.usersToShow = this.users.filter(user => this.onlineUsers.includes(user.name));
  }
}
