import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketServiceService {
  private socket;
  private apiUrl = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.apiUrl);
  }

  getSocket() {
    return this.socket;
  }

}
