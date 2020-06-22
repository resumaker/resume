import React from 'react';
import { Provider } from 'react-redux';

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

export const wrapRootElement = ({ element }) => {
  const store = createStore(
    JSON.parse(window.localStorage.getItem('resumakerSettings') || '{}')
  );
  return (
    <Provider store={store}>{element}</Provider>
  );
}