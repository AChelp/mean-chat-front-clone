import { Component, OnInit } from '@angular/core';
import { ActiveDialogComponent } from '../active-dialog/active-dialog.component';
import { AttributesMap } from 'ng-dynamic-component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  activeDialog = ActiveDialogComponent;

  inputs = {
    username: '',
    userToChat: null,
    roomName: 'Generalroom',
  };

  attrs: AttributesMap = {
    class: 'active-dialog-wrapper',
  };

  ngOnInit() {
    this.inputs.username = sessionStorage.getItem('username');
  }

  setActiveRoom = (user) => {
    this.inputs.userToChat = user;

    if (this.inputs.userToChat.name !== 'General room') {
      this.inputs.roomName = [this.inputs.username, this.inputs.userToChat.name]
        .sort((a, b) => a.localeCompare(b)).join('')
        .split(' ')
        .join('');
    } else {
      this.inputs.roomName = 'Generalroom';
    }
  }

}
