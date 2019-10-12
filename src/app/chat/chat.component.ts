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
    usernameToChat: 'general',
    roomName: 'general',
  };

  attrs: AttributesMap = {
    class: 'active-dialog-wrapper',
  };


  constructor() {
  }

  ngOnInit() {
    this.inputs.username = localStorage.getItem('username');
  }

  setActiveRoom = (user) => {
    this.inputs.usernameToChat = user.name;

    if (this.inputs.usernameToChat !== 'general') {
      this.inputs.roomName = [this.inputs.username, this.inputs.usernameToChat].sort((a, b) => a.localeCompare(b)).join('');
    } else {
      this.inputs.roomName = 'general';
    }
  }

}
