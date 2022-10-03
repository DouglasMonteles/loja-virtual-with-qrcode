import { Injectable } from '@angular/core';
import QrScanner from 'qr-scanner';

@Injectable({
  providedIn: 'root'
})
export class QrcodeScannerService {

  constructor() { }


  public openCamera(
    onOpenCamera: (result: QrScanner.ScanResult) => void,
    videoElem: HTMLVideoElement, options = {
      highlightScanRegion: true, // determina a região do foco do scanner
      highlightCodeOutline: true, // marca a região do QRcode capturada
  }): QrScanner {
    return new QrScanner(videoElem, onOpenCamera, options);
  }

}
