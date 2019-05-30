import { ActionReducer, MetaReducer } from '@ngrx/store';

export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state, action: any) {
      if (action.type === 'SET_ROOT_STATE') {
        return action.payload;
      }
      return reducer(state, action);
    };
  }

  export const metaReducers: MetaReducer<any>[] = [stateSetter];