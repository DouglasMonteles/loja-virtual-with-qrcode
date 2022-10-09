import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  product: Product = {} as Product;

  constructor(
    private _cartService: CartService,
  ) { }

  ngOnInit(): void {
  }

  public addCartItem(): void {
    this._cartService.addCartItem(this.product);
  }

}
