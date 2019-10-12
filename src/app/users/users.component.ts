import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: { name: string, email: string, password: string }[];
  @Input() username;
  @Input() setActiveRoom;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getUsers().subscribe((users: { name: string, email: string, password: string }[]) => {
      this.users = users.filter(user => user.name !== this.username);
    });

  }

}
