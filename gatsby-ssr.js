const React = require('react');
const { Provider } = require('react-redux');

const createStore = require('./src/store').default;
const store = createStore();

exports.wrapRootElement = ({ element }) => (
    <Provider store={store}>{element}</Provider>
);