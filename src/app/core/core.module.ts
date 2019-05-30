import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { CenterComponent } from './components/center/center.component';
import { HeadlineComponent } from './components/headline/headline.component';
import { SlideComponent } from './components/slide/slide.component';
import { CombineObservablesSlideComponent } from './components/slides/combine-observables-slide/combine-observables-slide.component';
import { InputObservableSlideComponent } from './components/slides/input-observavle-slide/input-observavle-slide.component';
import { IntervalSlideComponent } from './components/slides/interval-slide/interval-slide.component';
import { SublineComponent } from './components/subline/subline.component';
import { AppComponent } from './containers/app/app.component';
import { SlidesComponent } from './containers/slides/slides.component';
import { slidesReducer } from './reducers/core.reducer';
import { metaReducers } from './reducers/stateSetter.reducer';
import { IntervalsService } from './services/intervals.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      { slides: slidesReducer },
      { metaReducers: metaReducers }
    )
  ],
  declarations: [
    AppComponent,
    SlidesComponent,
    HeadlineComponent,
    CenterComponent,
    SlideComponent,
    SublineComponent,
    IntervalSlideComponent,
    InputObservableSlideComponent,
    CombineObservablesSlideComponent
  ],
  providers: [IntervalsService],
  exports: [AppComponent]
})
export class CoreModule {}
