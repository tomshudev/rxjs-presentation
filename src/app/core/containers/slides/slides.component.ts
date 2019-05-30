import { Component, HostBinding, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import {
  getCurrentSlide,
  getTheme,
  SlidesState
} from '../../reducers/core.reducer';
import { IntervalsService } from '../../services/intervals.service';
import { Interval } from '../../models/interval.model';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit {
  @HostBinding('class') componentCssClass;

  steps = [
    '',
    `<pre class="highlight" style="display: block; overflow-x: auto; padding: 0.5em; background: rgb(0, 0, 0); color: rgb(170, 170, 170);"><span class="highlight__keyword">export</span> <span class="highlight__keyword">class</span> SlideComponent <span class="highlight__keyword">implements</span> OnInit {
      @Input() orientation: <span class="hljs-built_in" style="color: rgb(255, 85, 255);">string</span>;
    
      <span class="highlight__keyword">constructor</span>() {}
    
      ngOnInit() {
        <span class="hljs-built_in" style="color: rgb(255, 85, 255);">console</span>.log(<span class="highlight__keyword">this</span>.orientation);
      }
    }</pre>`
  ]

  constructor(private store: Store<SlidesState>, private intervalsService: IntervalsService) {}

  prevSlide: number;
  currentlSlide: number = 1;

  currentSlide$ = this.store.select(getCurrentSlide).pipe(
    tap(c => {
      this.prevSlide = this.currentlSlide || 0;
      this.currentlSlide = c;
      setTimeout(() => {}, 0);
    })
  );

  theme$ = this.store.select(getTheme);

  isSlidingRight() {
    return this.currentlSlide > this.prevSlide ? 'right' : 'left';
  }

  toHTML(input: string) {
    return new DOMParser().parseFromString(input, 'text/html').documentElement.textContent;
  }

  getInterval(index: number): Interval {
    return this.intervalsService.getInterval(index);
  }

  ngOnInit() {}
}
