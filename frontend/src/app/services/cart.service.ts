import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartQuantity$ = new Subject<number>();

  constructor(
    private _localStorageService: LocalStorageService,
  ) {}

  public addCartItem(product: Product): void {
    const cartItems = this._localStorageService.getData<CartItem[]>(environment.cartStorageKey) ?? [];
    const index = cartItems.findIndex(item => item.product.id === product.id);

    if (index === -1) {
      const item: CartItem = {
        product,
        quantity: 1,
      };

      cartItems.push(item);
    } else {
      const item = cartItems[index];

      cartItems[index] = {
        product: item.product,
        quantity: item.quantity + 1,
      };
    }

    this._localStorageService.setData(environment.cartStorageKey, cartItems);
    this.cartQuantity$.next(this.getQuantityOfCartItems());
  }

  public getQuantityOfCartItems(): number {
    const cartItems = this._localStorageService.getData<CartItem[]>(environment.cartStorageKey) ?? [];
    return cartItems.length;
  }

  public get cartQuantity(): Observable<number> {
    return this.cartQuantity$;
  }

  public get cartItems(): CartItem[] {
    const cartItems = this._localStorageService.getData<CartItem[]>(environment.cartStorageKey) ?? [];
    return cartItems;
  }

}
