import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemFilter } from '../../../../shared/models/item-filter';
import { ItemFilterService } from '../../../../shared/services/item-filter.service';
import { SaveFilterModalComponent } from '../save-filter-modal/save-filter-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageFilterModalComponent } from '../manage-filter-modal/manage-filter-modal.component';

@Component({
  selector: 'app-custom-filter-dropdown',
  templateUrl: './custom-filter-dropdown.component.html',
  styleUrls: ['./custom-filter-dropdown.component.scss']
})
export class CustomFilterDropdownComponent implements OnInit {
  public itemFilters: Array<ItemFilter>;
  constructor(private itemFilterService: ItemFilterService, private modalService: NgbModal) { }
  private _filter;

  @Output() filterChange = new EventEmitter<any>();
  @Output() clearFilter = new EventEmitter<any>();

  @Input()
  set filter(filter) {
    this._filter = filter;
  }

  ngOnInit() {
    this.itemFilters = [];
    this.itemFilterService.getItemFilters().subscribe(data => {
      this.itemFilters = data;
    });
  }
  saveFilter() {
    const modalRef = this.modalService.open(SaveFilterModalComponent);

    modalRef.componentInstance.filter = this._filter;
    modalRef.result.then(filter => {
      this.itemFilters.push(filter);
    });
  }

  deleteFilterItem(itemFilter) {
    this.itemFilterService.deleteItemFilter(itemFilter._id).subscribe(() => {
      this.itemFilters.splice(this.itemFilters.indexOf(itemFilter), 1);
    });
  }

  setAsActiveFilter(itemFilter) {
    this.filterChange.emit(itemFilter.filters);
  }

  removeAllFilters() {
    this.clearFilter.emit();
  }

  manageFilters() {
    const modalRef = this.modalService.open(ManageFilterModalComponent, { size: 'lg' });

    modalRef.componentInstance.itemFilters = this.itemFilters;
    modalRef.result.then(filters => {
      this.itemFilters = filters;
    }).catch((error) => {

    });
  }
}
