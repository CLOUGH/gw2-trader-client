import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Item } from '../../models/item';


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ItemService {
  private apiUrl = 'http://localhost:3000';
  private socket: SocketIOClient.Socket; // The client instance of socket.io

  constructor(private http: Http) {
    this.socket = io(this.apiUrl);
  }

  getSyncMessages(): Observable<any> {
    const observable = new Observable(observer => {
      this.socket.on('/items/sync', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getItems(query) {
    return this.http.get(`${this.apiUrl}/items`, { params: query })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getItem(id) {
    return this.http.get(`${this.apiUrl}/items/${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  excuteSync() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.apiUrl}/items/sync`, {}, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  calculateProfit(buy, sell) {
    return (sell - (sell * 0.15)) - buy;
  }
  calculateROI(buy, sell) {
    return sell > 0 ? this.calculateProfit(buy, sell) / buy * 100 : 0;
  }

}
