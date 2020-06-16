(function() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', '//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css');
  const head = document.head || document.getElementsByTagName('head')[0];
  head.insertBefore(link, head.childNodes[0]);
})();

(function() {
  const style = document.createElement('style');
  style.setAttribute('id', 'custom-theme-styles');
  document.head.appendChild(style);
})();