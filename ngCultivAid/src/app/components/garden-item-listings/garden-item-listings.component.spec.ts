import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenItemListingsComponent } from './garden-item-listings.component';

describe('GardenItemListingsComponent', () => {
  let component: GardenItemListingsComponent;
  let fixture: ComponentFixture<GardenItemListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardenItemListingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenItemListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
