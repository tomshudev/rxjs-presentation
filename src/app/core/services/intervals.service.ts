import { Injectable } from '@angular/core';
import { Interval } from '../models/interval.model';
import { interval, fromEvent, EMPTY, of } from 'rxjs';
import { take, tap, map, throttleTime, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntervalsService {
  intervals: Map<number, Interval> = new Map<number, Interval>();

  constructor() {
    this.intervals.set(3, {
      headline: 'inetrval(1000)',
      length: 6,
      time: 6,
      observable: interval(1000)
    });
    this.intervals.set(4, {
      headline: 'map((x) => Math.pow(x, 2))',
      length: 6,
      time: 6,
      observable: interval(1000).pipe(map(x => Math.pow(x, 2)))
    });
    this.intervals.set(9, {
      headline: `fromEvent(document, 'mousemove')`,
      length: 10,
      time: 10,
      observable: fromEvent(document, 'mousemove').pipe(
        mapTo('moved'),
        throttleTime(300)
      ),
      handleTimes: true
    });
    this.intervals.set(14, {
      headline: `fromEvent(input, 'keydown')`,
      length: Infinity,
      time: 15,
      observable: of(EMPTY),
      showInput: true,
      handleTimes: true
    });
    this.intervals.set(30, {
      headline: `combineLatest()`,
      length: Infinity,
      time: 60,
      observable: fromEvent(document, 'mousemove').pipe(
        throttleTime(300),
        map((x: MouseEvent) => x.x)
      ),
      handleTimes: true,
      showInput: true
    });
  }

  getInterval(index: number): Interval {
    return this.intervals.get(index);
  }
}
