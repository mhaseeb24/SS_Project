import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAProductComponent } from './track-a-product.component';

describe('TrackAProductComponent', () => {
  let component: TrackAProductComponent;
  let fixture: ComponentFixture<TrackAProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackAProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackAProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
