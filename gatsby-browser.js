import React from 'react';
import get from 'lodash.get';
import set from 'lodash.set';
import isEmpty from 'lodash.isempty';
import { Provider } from 'react-redux';
import isPlainObject from 'lodash.isplainobject';

import createStore from './src/store';

(function() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', '//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css');
  const head = document.head || document.getElementsByTagName('head')[0];
  head.insertBefore(link, head.childNodes[0]);
})();

(function() {
  const head = document.head || document.getElementsByTagName('head')[0];
  ['custom-theme-styles', 'custom-direction-styles'].forEach(id => {
    const style = document.createElement('style');
    style.setAttribute('id', id);
    head.appendChild(style);
  });
})();

const loadInitialState = () => {
  const state = JSON.parse(window.localStorage.getItem('resumakerSettings') || '{}');
  if (isEmpty(state)) {
    return state;
  }
  if (isPlainObject(state)) {
    if (isPlainObject(get(state, 'global.resume.contact.phone'))) {
      return state;
    }
    set(state, 'global.resume.contact.phone', {});
    set(state, 'global.resume.contact.phone.value', get(state, 'global.resume.contact.phone', ''));
    set(state, 'global.resume.contact.phone.visible', true);

    set(state, 'global.resume.contact.email', {});
    set(state, 'global.resume.contact.email.value', get(state, 'global.resume.contact.email', ''));
    set(state, 'global.resume.contact.email.visible', true);

    set(state, 'global.resume.contact.website', {});
    set(state, 'global.resume.contact.website.value', get(state, 'global.resume.contact.website', ''));
    set(state, 'global.resume.contact.website.visible', true);

    set(state, 'global.resume.contact.location', {});
    set(state, 'global.resume.contact.location.value', get(state, 'global.resume.contact.location', ''));
    set(state, 'global.resume.contact.location.visible', true);
  }
  return state;
};

export const wrapRootElement = ({ element }) => {
  const store = createStore(loadInitialState());
  return (
    <Provider store={store}>{element}</Provider>
  );
};