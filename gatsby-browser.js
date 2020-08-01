import React from 'react';
import get from 'lodash.get';
import set from 'lodash.set';
import isNil from 'lodash/isNil';
import { Base64 } from 'js-base64';
import isEmpty from 'lodash.isempty';
import queryString from 'query-string';
import { Provider } from 'react-redux';
import isPlainObject from 'lodash/isPlainObject';

import createStore from './src/store';

const head = document.head || document.getElementsByTagName('head')[0];

(function pushSemnticUiCss() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', '//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css');
  head.insertBefore(link, head.childNodes[0]);
})();

(function pushCustomCss() {
  ['custom-theme-styles', 'custom-direction-styles'].forEach(id => {
    const style = document.createElement('style');
    style.setAttribute('id', id);
    head.appendChild(style);
  });
})();

const loadInitialState = () => {
  const parsed = queryString.parse(window.location.search);
  if (!isEmpty(parsed) && parsed.d) {
    try {
      const state = JSON.parse(
        Base64.decode(decodeURIComponent(parsed.d))
      );
      return state;
    } catch(e) {}
  }

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

  if (isNil(get(state, 'global.sidebarActive'))) {
    set(state, 'global.sidebarActive', true);
  }
  return state;
};

export const wrapRootElement = ({ element }) => {
  const store = createStore(loadInitialState());
  return <Provider store={store}>{element}</Provider>;
};