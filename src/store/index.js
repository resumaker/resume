import produce from 'immer';
import set from 'lodash.set';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import initialState from './initial-state';

const globalReducer = (state = initialState, action) => produce(state, draft => {
  switch (action.type) {
    case 'SET_FIELD': {
      const { path, value } = action.payload;
      set(draft, path, value);
      break;
    }
    default:
      return state;
  }
});

const rootReducer = combineReducers({ global: globalReducer });

export default (preloadedState = {}) =>
  createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware()));
