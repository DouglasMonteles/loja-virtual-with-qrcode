import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ProductTableComponent } from './pages/cart/product-table/product-table.component';
import { QrcodeScannerComponent } from './components/qrcode-scanner/qrcode-scanner.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatCardModule } from '@angular/material/card';
import { registerLocaleData } from '@angular/common';
import LOCALE_BR from '@angular/common/locales/pt';

registerLocaleData(LOCALE_BR);

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductsComponent,
    SideNavComponent,
    ProductTableComponent,
    QrcodeScannerComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
