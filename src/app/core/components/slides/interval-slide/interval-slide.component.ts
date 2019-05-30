import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { interval, Observable, fromEvent, Subscription } from 'rxjs';
import { take, tap, map, filter } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { Interval } from 'src/app/core/models/interval.model';

@Component({
  selector: 'app-interval-slide',
  templateUrl: './interval-slide.component.html',
  styleUrls: ['./interval-slide.component.scss'],
  animations: [
    trigger('line', [
      transition(':enter', [
        style({ width: '0' }),
        animate('{{time}}s', style({ width: '100%' }))
      ])
    ]),
    trigger('circle', [
      transition(':enter', [
        style({ opacity: 0, transform: `translateX({{x}}rem) scale(0) ` }),
        animate(
          '.2s',
          style({ opacity: 1, transform: `translateX({{x}}rem) scale(1)` })
        )
      ])
    ])
  ]
})
export class IntervalSlideComponent implements OnInit {
  @Input() interval: Interval;

  values: number[] = [];
  times: number[] = [];

  colors: string[] = ['#B8FF9F', '#E8C668', '#FF3E26', '#9E5EE8', '#89E7FF'];

  constructor() {}

  calculateX(i, addition = 0) {
    if (this.interval.handleTimes) {
      return this.calculateByTime(i, addition);
    } else {
      return this.calculateByLength(i, addition);
    }
  }

  calculateByLength(i, addition = 0) {
    let wholeGap = 70 - 6 * this.interval.length;
    let gap = wholeGap / (this.interval.length - 1);
    let x = 0;

    if (i !== 0) {
      x += gap * i;
    }

    return x + addition;
  }

  calculateByTime(i, addition = 0) {
    let x =
      Math.min(
        (this.times[i] - this.startTime) / 1000 / this.interval.time,
        1
      ) * 60;

    return x + addition;
  }

  ngOnInit() {
    fromEvent(document, 'keydown')
      .pipe(
        map((e: any) => e.keyCode),
        filter((key: number) => key === 192),
        tap(() => {
          this.values = [];
          this.times = [];
          this.registerObservable();
        })
      )
      .subscribe();

    if (!this.interval.showInput) {
      this.registerObservable();
    }
  }

  startTime: number = 0;

  subscruption: Subscription;

  registerObservable() {
    this.subscruption ? this.subscruption.unsubscribe() : undefined;
    this.subscruption = this.interval.observable
      .pipe(
        take(this.interval.length),
        tap(v => this.values.push(v)),
        tap(() => this.times.push(Date.now()))
      )
      .subscribe();

    this.startTime = Date.now();
  }
}
