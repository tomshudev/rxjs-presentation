import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Interval } from 'src/app/core/models/interval.model';
import { fromEvent } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { IntervalSlideComponent } from '../interval-slide/interval-slide.component';

@Component({
  selector: 'app-input-observable-slide',
  templateUrl: './input-observavle-slide.component.html',
  styleUrls: ['./input-observavle-slide.component.scss']
})
export class InputObservableSlideComponent implements OnInit, AfterViewInit {

  @ViewChild('textInput') input: ElementRef;

  @ViewChild('axis') axis: IntervalSlideComponent;

  @Input() interval: Interval;

  constructor() { }

  ngOnInit() {
    fromEvent(document, 'keydown')
      .pipe(
        map((e: any) => e.keyCode),
        filter((key: number) => key === 192),
        tap(() => {
          if (this.input && this.input.nativeElement) {
            this.input.nativeElement.value = '';
          }
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    let rxjsLetters = ['r', 'x', 'j', 's'];

    if (this.interval.showInput && this.input) {
      this.interval.observable = fromEvent(
        this.input.nativeElement,
        'keydown'
      ).pipe(
        map((e: any) => e.key),
        filter((key: string) => rxjsLetters.indexOf(key.toLowerCase()) !== -1)
      );
      this.input.nativeElement.focus();
    }

    this.axis.registerObservable();
  }

}
