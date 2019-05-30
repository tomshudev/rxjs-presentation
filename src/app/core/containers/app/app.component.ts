import { Component, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { SlidesState, getCurrentSlide } from '../../reducers/core.reducer';
import {
  PrevSlideAction,
  NextSlideAction,
  ChangeThemeAction
} from '../../actions/core.actions';
import { tap, throttleTime, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store<SlidesState>) {
    fromEvent(document, 'keydown')
      .pipe(
        filter((e: KeyboardEvent) => [37, 39, 83].indexOf(e.keyCode) !== -1),
        throttleTime(300)
      )
      .subscribe(e => {
        this.handleKeyDown(e);
      });
    // document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
  }

  handleKeyDown(e: any) {
    switch (e.keyCode) {
      case 37: {
        this.store.dispatch(new PrevSlideAction());
        break;
      }
      case 39: {
        this.store.dispatch(new NextSlideAction());
        break;
      }
      case 83: {
        this.store.dispatch(new ChangeThemeAction());
        break;
      }
    }
  }
}
