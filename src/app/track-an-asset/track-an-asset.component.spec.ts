import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAnAssetComponent } from './track-an-asset.component';

describe('TrackAnAssetComponent', () => {
  let component: TrackAnAssetComponent;
  let fixture: ComponentFixture<TrackAnAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackAnAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackAnAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
