import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemFilterService } from '../../../../shared/services/item-filter.service';

@Component({
  selector: 'app-manage-filter-modal',
  templateUrl: './manage-filter-modal.component.html',
  styleUrls: ['./manage-filter-modal.component.scss']
})
export class ManageFilterModalComponent implements OnInit {

  @Input() public itemFilters;

  constructor(public activeModal: NgbActiveModal, private itemFilterService: ItemFilterService) { }

  ngOnInit() {
  }

  deleteItemFilter(itemFilter) {
    this.itemFilterService.deleteItemFilter(itemFilter._id).subscribe(() => {
      this.itemFilters.splice(this.itemFilters.indexOf(itemFilter), 1);
    });
  }

  ok() {
    this.activeModal.close(this.itemFilters);
  }
}
