import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAProductComponent } from './add-a-product.component';

describe('AddAProductComponent', () => {
  let component: AddAProductComponent;
  let fixture: ComponentFixture<AddAProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
