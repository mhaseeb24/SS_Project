import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorPageComponent } from './distributor-page.component';

describe('DistributorPageComponent', () => {
  let component: DistributorPageComponent;
  let fixture: ComponentFixture<DistributorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
