import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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

  @Input() public filter;
  @Output() filterChange = new EventEmitter<any>();
  public advanceFilterCollapsed = true;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
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
      minProfit: [''],
      maxProfit: [''],
      minROI: ['', Validators.min(0)],
      maxROI: ['', Validators.min(0)],
      minSUC: ['', Validators.min(0)],
      maxSUC: ['', Validators.min(0)],
      minBUC: ['', Validators.min(0)],
      maxBUC: ['', Validators.min(0)],
    });

    this.filterForm.patchValue(this.filter);

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

}
