import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import QrScanner from 'qr-scanner';
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
      console.log('resultado: ');
      console.log(result);
      this.qrScanner.pause(true);

      alert('Você será redirecionado para: ' + result.data);
      window.location.href = result.data;

      setTimeout(() => this.qrScanner.start(), 3000);
    }

    this.qrScanner = this._qrCodeScannerService.openCamera(
      onCameraReady,
      this.videoElem.nativeElement,
    );

    this.qrScanner.start();
  }

}
