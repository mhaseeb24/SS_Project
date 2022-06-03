import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifierPageComponent } from './verifier-page.component';

describe('VerifierPageComponent', () => {
  let component: VerifierPageComponent;
  let fixture: ComponentFixture<VerifierPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifierPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifierPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
