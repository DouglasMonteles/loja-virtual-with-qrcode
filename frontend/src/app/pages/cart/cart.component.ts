import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
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
  products: Product[] = [{ id:1, name: 'teste', price: 12 }];

  constructor(
    private _wsService: WebSocketService,
  ) { }

  ngOnInit() {
    this.wsConnection();
  }

  public wsConnection(): void {
    this.stompClient = this._wsService.connect(environment.baseWebSocketUrl);
    this.stompClient.debug = () => {};
    this.stompClient.connect({}, (frame) => {
      console.log(frame);
      this.stompClient.subscribe('/user/topic/product-added', (message) => {
        const product = JSON.parse(message.body);
        this.products.push(product);
      });
    },

    (error) => {
      setTimeout(() => this.wsConnection(), 5000);
    });
  }

}
