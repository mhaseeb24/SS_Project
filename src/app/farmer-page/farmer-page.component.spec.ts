import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerPageComponent } from './farmer-page.component';

describe('FarmerPageComponent', () => {
  let component: FarmerPageComponent;
  let fixture: ComponentFixture<FarmerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
