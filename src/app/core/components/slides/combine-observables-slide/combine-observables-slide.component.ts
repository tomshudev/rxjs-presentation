import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { IntervalSlideComponent } from '../interval-slide/interval-slide.component';
import { Interval } from 'src/app/core/models/interval.model';
import { fromEvent, combineLatest } from 'rxjs';
import { map, filter, tap, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-combine-observables-slide',
  templateUrl: './combine-observables-slide.component.html',
  styleUrls: ['./combine-observables-slide.component.scss']
})
export class CombineObservablesSlideComponent implements OnInit, AfterViewInit {
  @ViewChild('first') first: ElementRef;
  @ViewChild('second') second: ElementRef;

  @ViewChild('axis') axis: IntervalSlideComponent;

  @Input() interval: Interval;

  constructor() {}

  ngOnInit() {
    fromEvent(document, 'keydown')
      .pipe(
        map((e: any) => e.keyCode),
        filter((key: number) => key === 192),
        tap(() => {
          if (this.first && this.first.nativeElement) {
            this.first.nativeElement.value = '';
          }
          if (this.second && this.second.nativeElement) {
            this.second.nativeElement.value = '';
          }
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    if (this.interval.showInput && this.first && this.second) {
      this.interval.observable = combineLatest(
        fromEvent(document, 'mousemove').pipe(
          throttleTime(300),
          map((x: MouseEvent) => x.x)
        ),
        fromEvent(this.first.nativeElement, 'keydown').pipe(
          map((e: any) => e.key)
        ),
        fromEvent(this.second.nativeElement, 'keydown').pipe(
          map((e: any) => e.key)
        )
      ).pipe(
        map(
          ([move, firstInput, secondInput]) =>
            `${move}${firstInput}${secondInput}`
        )
      );
      this.first.nativeElement.focus();
    }

    this.axis.registerObservable();
  }
}
