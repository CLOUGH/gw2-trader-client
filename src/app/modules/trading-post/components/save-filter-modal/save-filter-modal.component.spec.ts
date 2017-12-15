import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFilterModalComponent } from './save-filter-modal.component';

describe('SaveFilterModalComponent', () => {
  let component: SaveFilterModalComponent;
  let fixture: ComponentFixture<SaveFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
