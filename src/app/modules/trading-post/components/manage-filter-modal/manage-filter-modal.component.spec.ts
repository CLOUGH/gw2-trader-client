import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFilterModalComponent } from './manage-filter-modal.component';

describe('ManageFilterModalComponent', () => {
  let component: ManageFilterModalComponent;
  let fixture: ComponentFixture<ManageFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
