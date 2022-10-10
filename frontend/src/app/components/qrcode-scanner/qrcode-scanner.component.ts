import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import QrScanner from 'qr-scanner';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { QrcodeScannerService } from 'src/app/services/qrcode-scanner.service';

@Component({
  selector: 'app-qrcode-scanner',
  templateUrl: './qrcode-scanner.component.html',
  styleUrls: ['./qrcode-scanner.component.css']
})
export class QrcodeScannerComponent implements OnInit, AfterViewInit, OnDestroy {

  isActiveScanner: boolean = false;

  @ViewChild('qrVideo')
  videoElem: ElementRef<HTMLVideoElement> = {} as ElementRef<HTMLVideoElement>;

  qrScanner: QrScanner = {} as QrScanner;

  constructor(
    private _qrCodeScannerService: QrcodeScannerService,
    private _productService: ProductService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._startQrCodeScanner();
  }

  ngOnDestroy(): void {
    this.qrScanner.destroy();
  }

  private _startQrCodeScanner(): void {
    this.isActiveScanner = false;

    const onCameraReady = (result: QrScanner.ScanResult) => {
      let timeoutId: any = 0;
      clearTimeout(timeoutId);

      console.log('resultado: ');
      console.log(result);
      this.qrScanner.pause(true);

      result.data = JSON.stringify({
        "id": 4,
        "name": "Teste 2",
        "price": 1.00,
        "description": ""
      });

      this._productService.addCartItemWithWS(JSON.parse(result.data)).subscribe();

      timeoutId = setTimeout(() => this.qrScanner.start(), 1000);
    }

    this.qrScanner = this._qrCodeScannerService.openCamera(
      onCameraReady,
      this.videoElem.nativeElement,
    );

    this.qrScanner.start();
  }

}
