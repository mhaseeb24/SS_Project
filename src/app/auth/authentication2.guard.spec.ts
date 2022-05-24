import { TestBed, async, inject } from '@angular/core/testing';

import { Authentication2Guard } from './authentication2.guard';

describe('Authentication2Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Authentication2Guard]
    });
  });

  it('should ...', inject([Authentication2Guard], (guard: Authentication2Guard) => {
    expect(guard).toBeTruthy();
  }));
});
