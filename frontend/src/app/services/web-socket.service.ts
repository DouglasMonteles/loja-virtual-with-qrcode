import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJs from 'sockjs-client'

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }


  public connect(wsUrl: string): Stomp.Client {
    const ws = new SockJs(wsUrl);
    return Stomp.over(ws);;
  }

}
