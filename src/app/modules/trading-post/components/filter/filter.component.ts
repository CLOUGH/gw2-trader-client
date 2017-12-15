import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { ItemFilter } from '../../../../shared/models/item-filter';
import { NgModel } from '@angular/forms';
import { SaveFilterModalComponent } from '../save-filter-modal/save-filter-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public filterForm: FormGroup;
  public itemTypes = [
    '',
    'Armor',
    'Back',
    'Consumable',
    'CraftingMaterial',
    'Gathering',
    'Gizmo',
    'MiniPet',
    'Tool',
    'Trait',
    'Trinket',
    'Trophy',
    'UpgradeComponent',
    'Weapon'
  ];

  public itemRarities = [
    '', 'Junk', 'Basic', 'Fine', 'Masterwork', 'Rare', 'Exotic', 'Ascended', 'Legendary'
  ];

  @Output() filterChange = new EventEmitter<any>();
  @Output() filterSaved = new EventEmitter<ItemFilter>();
  public advanceFilterCollapsed = true;
  public currentFilter: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

  }

  @Input()
  set filter(filter) {
    this.filterForm = this.createFilterForm();
    this.filterForm.patchValue(filter);
    this.currentFilter = filter;
    this.subscribeToFormChange();

  }

  subscribeToFormChange() {
    this.filterForm.valueChanges.subscribe(filter => {
      this.filterChange.emit(this.getFilteredValues(filter));
    });
  }
  submit() {
    this.filterChange.emit(this.getFilteredValues(this.filterForm.value));
  }

  getFilteredValues(filter) {
    const filteredValues = {};

    for (const key in filter) {
      if (filter[key]) {
        filteredValues[key] = filter[key];
      }
    }

    return filteredValues;
  }

  createFilterForm() {
    return this.formBuilder.group({
      type: '',
      name: '',
      rarity: '',
      maxLevel: ['', [Validators.max(80), Validators.min(0)]],
      minLevel: ['', [Validators.max(80), Validators.min(0)]],
      minBuy: ['', Validators.min(0)],
      maxBuy: ['', Validators.min(0)],
      minSell: ['', Validators.min(0)],
      maxSell: ['', Validators.min(0)],
      minSupply: ['', Validators.min(0)],
      maxSupply: ['', Validators.min(0)],
      minDemand: ['', Validators.min(0)],
      maxDemand: ['', Validators.min(0)],
      minProfit: ['', Validators.min(0)],
      maxProfit: ['', Validators.min(0)],
      minROI: ['', Validators.min(0)],
      maxROI: ['', Validators.min(0)],
      minSUC: ['', Validators.min(0)],
      maxSUC: ['', Validators.min(0)],
      minBUC: ['', Validators.min(0)],
      maxBUC: ['', Validators.min(0)],
      limit: [20, Validators.min(0)]
    });
  }

  resetForm() {
    this.filterForm.reset();
  }

  updateActiveFilter(filter) {
    console.log(filter);
    this.filterForm.patchValue(filter);
  }

}
