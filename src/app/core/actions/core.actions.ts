import { Action } from '@ngrx/store';

export enum SlidesActionTypes {
  NEXT_SLIDE = '[Slides] Next slide',
  PREV_SLIDE = '[Slides] Prev slide',
  CHANGE_THEME = '[Slides] Change theme'
}

export class NextSlideAction implements Action {
  readonly type = SlidesActionTypes.NEXT_SLIDE;
}

export class PrevSlideAction implements Action {
  readonly type = SlidesActionTypes.PREV_SLIDE;
}

export class ChangeThemeAction implements Action {
  readonly type = SlidesActionTypes.CHANGE_THEME;
}

export type SlidesActions =
  | NextSlideAction
  | PrevSlideAction
  | ChangeThemeAction;
