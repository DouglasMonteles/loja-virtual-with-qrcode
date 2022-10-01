import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  stompClient: Stomp.Client = {} as Stomp.Client;

  constructor(
    private _wsService: WebSocketService,
  ) { }

  ngOnInit() {
    this.wsConnection();
  }

  public wsConnection(): void {
    this.stompClient = this._wsService.connect(environment.baseWebSocketUrl);
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe('/user/topic/product-added', (message) => {
        console.log(message.body);
      });
    }, (error) => {
      setTimeout(() => this.wsConnection(), 5000);
    });
  }

}
