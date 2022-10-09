import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setData(key: string, value: any): void {
    const strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
  }

  public getData<T>(key: string): T | null {
    const item = localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    }

    return null;
  }

  public clearData(key: string): void {
    localStorage.removeItem(key);
  }

}
