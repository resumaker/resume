(function() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', '//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css');
  document.head.appendChild(link);
})();

(function() {
  const style = document.createElement('style');
  style.setAttribute('id', 'custom-theme-styles');
  document.head.appendChild(style);
})();

// export const onServiceWorkerUpdateReady = () => {
//   // eslint-disable-next-line no-alert
//   const answer = typeof window !== `undefined` ? window.confirm(
//     'This application has been updated. Reload to display the latest version?'
//   ) : 0;
//   if (answer === true) {
//     typeof window !== `undefined` ? window.location.reload() : null;
//   }
// };
