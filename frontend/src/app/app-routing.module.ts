import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QrcodeScannerComponent } from './components/qrcode-scanner/qrcode-scanner.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/scanner',
    component: QrcodeScannerComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
