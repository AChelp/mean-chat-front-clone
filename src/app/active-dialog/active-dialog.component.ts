import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked, AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild
} from '@angular/core';
import { ChatService } from '../chat.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-active-dialog',
  templateUrl: './active-dialog.component.html',
  styleUrls: ['./active-dialog.component.scss']
})
export class ActiveDialogComponent implements OnInit, OnChanges, AfterViewChecked {

  @ViewChild('messagesContainer', { static: false }) private messagesContainer: ElementRef;
  @Input() usernameToChat: string;
  @Input() username: string;
  @Input() roomName: string;
  private isTyping = false;
  messages: { user: string, message: string, sendAt: string }[];
  lasMessagesLength = 0;


  constructor(
    private socketService: SocketService,
    private chatService: ChatService
  ) {
    this.socketService.connect();

    this.socketService.receivedMessage().subscribe(data => {
      this.messages.push(data);
      this.isTyping = false;

    });

    this.socketService.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
      setTimeout(() => {
        this.isTyping = false;
      }, 2000);
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.messages = [];
    this.socketService
      .joinRoom({ user: this.username, room: this.roomName })
      .subscribe(data => {
        if (data.isReady) {
          this.chatService.getRoomHistory(this.roomName).subscribe((messages: { user: string, message: string, sendAt: string }[]) => {
            this.messages = messages;
          });
        }
      });
  }

  ngAfterViewChecked(): void {
    if (this.lasMessagesLength < this.messages.length) {
      console.log('message was add');
      this.lasMessagesLength = this.messages.length;
      this.scrollbottom();
    }
  }

  typing() {
    this.socketService.typing({
      roomName: this.roomName,
      user: this.username,
    });
  }

  scrollbottom() {
    this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
  }
}

