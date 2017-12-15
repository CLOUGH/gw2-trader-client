import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemFilterService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: Http) { }

  saveItemFilter(itemFilter) {
    return this.http.post(`${this.apiUrl}/item-filters`, itemFilter)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getItemFilters() {
    return this.http.get(`${this.apiUrl}/item-filters`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteItemFilter(id) {
    return this.http.delete(`${this.apiUrl}/item-filters/${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateItemFilter(itemFilter) {
    return this.http.post(`${this.apiUrl}/item-filter/${itemFilter._id}`, itemFilter)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
