import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  stompClient: Stomp.Client = {} as Stomp.Client;
  cartItems: CartItem[] = [];

  constructor(
    private _wsService: WebSocketService,
    private _cartService: CartService,
  ) {}

  ngOnInit() {
    this.wsConnection();
    this.cartItems = this._cartService.cartItems;
  }

  public wsConnection(): void {
    this.stompClient = this._wsService.connect(environment.baseWebSocketUrl);
    //this.stompClient.debug = () => {};
    this.stompClient.connect({}, (frame) => {
      console.log(frame);
      this.stompClient.subscribe('/user/topic/product-added', (message) => {
        const product = JSON.parse(message.body);
        this._cartService.addCartItem(product);
        this.cartItems = this._cartService.cartItems;
        console.log(message.body);
        console.log(this.cartItems);
      });
    },

    (error) => {
      setTimeout(() => this.wsConnection(), 5000);
    });
  }

  ngOnDestroy(): void {
    this.stompClient.disconnect(() => {
      console.log('stompClient disconnected');
    });
  }

}
