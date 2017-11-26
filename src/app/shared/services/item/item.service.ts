import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Item } from '../../models/item';


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { } from '@angular/http/src/headers';

@Injectable()
export class ItemService {
  private itemsUrl = 'http://localhost:3000/api/items';

  constructor(private http: Http) { }

  syncItemPrices(): Observable<Item[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.itemsUrl}/sync`, {}, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
