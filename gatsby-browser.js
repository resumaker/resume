(function() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', '//cdn.jsdelivr.net/npm/filepond-plugin-image-preview@4.6.4/dist/filepond-plugin-image-preview.min.css');
  document.head.appendChild(link);
})();

(function() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', '//cdn.jsdelivr.net/npm/filepond@4.15.1/dist/filepond.min.css');
  document.head.appendChild(link);
})();

(function() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', '//cdn.jsdelivr.net/npm/react-phone-input-2@2.13.5/lib/plain.css');
  document.head.appendChild(link);
})();

(function() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', '//cdn.jsdelivr.net/npm/react-calendar@3.1.0/dist/Calendar.min.css');
  document.head.appendChild(link);
})();

(function() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', '//cdnjs.cloudflare.com/ajax/libs/react-date-picker/8.0.1/DatePicker.min.css');
  document.head.appendChild(link);
})();

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
