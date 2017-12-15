import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemFilter } from '../../../../shared/models/item-filter';
import { ItemFilterService } from '../../../../shared/services/item-filter.service';

@Component({
  selector: 'app-save-filter-modal',
  templateUrl: './save-filter-modal.component.html',
  styleUrls: ['./save-filter-modal.component.scss']
})
export class SaveFilterModalComponent implements OnInit {
  public itemFilterForm: FormGroup;
  public submitted = false;
  @Input() filter;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private itemFilterService: ItemFilterService) { }

  ngOnInit() {
    this.itemFilterForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.itemFilterForm.patchValue(this.filter);
  }


  ok() {
    this.submitted = true;
    if (this.itemFilterForm.valid) {
      const itemFilter = this.itemFilterForm.value;
      itemFilter.filters = this.filter;
      this.itemFilterService.saveItemFilter(itemFilter).subscribe(data => {
        this.activeModal.close(data);
      });

    }
  }
}
