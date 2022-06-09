import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellToRetailerComponent } from './sell-to-retailer.component';

describe('SellToRetailerComponent', () => {
  let component: SellToRetailerComponent;
  let fixture: ComponentFixture<SellToRetailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellToRetailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellToRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
