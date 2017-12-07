import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ItemService } from '../../shared/services/item/item.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemResolverService implements Resolve<any> {

  constructor(private itemService: ItemService) { }


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.itemService.getItem(route.params.id);
  }
}
