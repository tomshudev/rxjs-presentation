import { SlidesActions, SlidesActionTypes } from '../actions/core.actions';
import {
  createFeatureSelector,
  createSelector,
  ActionReducerMap
} from '@ngrx/store';

export type Theme = {
  backgroundColor: string;
  fontColor: string;
};

export class Themes {
  public static DEFAULT: Theme = {
    backgroundColor: 'white',
    fontColor: 'black'
  };
  public static DARK: Theme = {
    backgroundColor: '#1e1e1e',
    fontColor: 'white'
  };
}

export type SlidesState = {
  currentSlide: number;
  theme: Theme;
};

export let initiallState: SlidesState = {
  currentSlide: 1,
  theme: Themes.DEFAULT
};

let shouldChangeTheme = [
  { from: 1, to: 2, theme: Themes.DEFAULT },
  { from: 3, to: 4, theme: Themes.DARK },
  { from: 5, to: 7, theme: Themes.DEFAULT },
  { from: 8, to: 11, theme: Themes.DARK },
  { from: 12, to: 12, theme: Themes.DEFAULT },
  { from: 13, to: 16, theme: Themes.DARK },
  { from: 17, to: 17, theme: Themes.DEFAULT },
  { from: 18, to: 22, theme: Themes.DARK },
  { from: 23, to: 23, theme: Themes.DEFAULT },
  { from: 24, to: 28, theme: Themes.DARK },
  { from: 29, to: 30, theme: Themes.DEFAULT },
  { from: 31, to: 40, theme: Themes.DARK }
];

export function slidesReducer(
  state: SlidesState = initiallState,
  action: SlidesActions
): SlidesState {
  switch (action.type) {
    case SlidesActionTypes.NEXT_SLIDE:
      return {
        ...state,
        currentSlide: state.currentSlide + 1,
        theme: getNewTheme(state.currentSlide + 1, state.theme)
      };

    case SlidesActionTypes.PREV_SLIDE:
      return {
        ...state,
        currentSlide: Math.max(state.currentSlide - 1, 1),
        theme: getNewTheme(state.currentSlide - 1, state.theme)
      };

    case SlidesActionTypes.CHANGE_THEME:
      return {
        ...state,
        theme: state.theme === Themes.DEFAULT ? Themes.DARK : Themes.DEFAULT
      };

    default:
      return state;
  }
}

function getNewTheme(slide: number, currTheme: Theme) {
  let newTheme = shouldChangeTheme.find(t => t.from <= slide && t.to >= slide);
  return newTheme ? newTheme.theme : currTheme;
}

export const getState = createFeatureSelector<SlidesState>('slides');

export const getCurrentSlide = createSelector(
  getState,
  (state: SlidesState) => state.currentSlide
);

export const getTheme = createSelector(
  getState,
  (state: SlidesState) => state.theme
);
