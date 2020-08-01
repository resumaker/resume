import produce from 'immer';
import set from 'lodash/set';
import omit from 'lodash/omit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import initialState from './initial-state';

const STORE_OMIT = ['isMobile'];

const updateLocalStorage = state => {
  if (typeof window !== `undefined` && 'localStorage' in window) {
    try {
      const store = JSON.parse(window.localStorage.getItem('resumakerSettings'));
      store.global = omit(state, STORE_OMIT);
      window.localStorage.setItem('resumakerSettings', JSON.stringify(store));
    } catch(e) {
      window.localStorage.setItem('resumakerSettings', JSON.stringify({ global: omit(state, STORE_OMIT) }));
    }
  }
};

const globalReducer = (state = initialState, action) => produce(state, draft => {
  switch (action.type) {
    case 'SET_FIELD': {
      const { path, value } = action.payload;
      set(draft, path, value);
      updateLocalStorage(draft);
      break;
    }
    default:
      return state;
  }
});

const rootReducer = combineReducers({ global: globalReducer });

export default (preloadedState = {}) =>
  createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware()));
