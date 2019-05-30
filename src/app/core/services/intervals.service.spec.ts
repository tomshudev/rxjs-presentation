/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IntervalsService } from './intervals.service';

describe('Service: Intervals', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntervalsService]
    });
  });

  it('should ...', inject([IntervalsService], (service: IntervalsService) => {
    expect(service).toBeTruthy();
  }));
});
