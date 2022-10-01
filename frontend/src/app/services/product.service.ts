import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductPage } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _http: HttpClient,
  ) { }

  public findAll(): Observable<ProductPage> {
    return this._http.get<ProductPage>(`${environment.baseApiUrl}/products`);
  }

}
