import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Item } from '../../models/item';


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as io from 'socket.io-client';

@Injectable()
export class ItemService {
  private socket;
  private apiUrl = 'http://localhost:3000';

  constructor(private http: Http) { }

  syncItemPrices(): Observable<any> {
    const observable = new Observable(observer => {
      this.socket = io(this.apiUrl);

      this.excuteSync().subscribe(message => {
        // console.log(message);
      });

      this.socket.on('/items/sync', (data) => {
        observer.next(data);

        if (data.message === 'Done') {
          this.socket.disconnect();
        }

      });

      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }

  excuteSync() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.apiUrl}/items/sync`, {}, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
