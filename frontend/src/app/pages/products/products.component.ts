import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Product, ProductPage } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<ProductPage> = EMPTY;

  constructor(
    private _productsService: ProductService,
  ) { }

  ngOnInit(): void {
    this.products$ = this._productsService.findAll();
  }

}
