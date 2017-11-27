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
  private apiUrl = 'http://localhost:3000';
  private socket;

  constructor(private http: Http) { }

  syncItemPrices(): Observable<any> {
    // const observable = new Observable(observer => {
    //   this.socket = io(this.apiUrl);

    //   this.socket.on('downloading item ids', (data) => {
    //     console.log('reached', data);
    //     observer.next(data);
    //   });

    //   return () => {
    //     this.socket.disconnect();
    //   };
    // });

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.apiUrl}/items/sync`, {}, options)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    // return observable;
  }

}
