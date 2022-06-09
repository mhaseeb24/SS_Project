import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellToDistributorComponent } from './sell-to-distributor.component';

describe('SellToDistributorComponent', () => {
  let component: SellToDistributorComponent;
  let fixture: ComponentFixture<SellToDistributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellToDistributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellToDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
