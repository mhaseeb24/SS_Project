import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerPageComponent } from './retailer-page.component';

describe('RetailerPageComponent', () => {
  let component: RetailerPageComponent;
  let fixture: ComponentFixture<RetailerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
