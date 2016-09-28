import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from './router.jsx';
import store from './store.jsx';

ReactDOM.render(
  <Provider store={store}>
    {<Router />}
  </Provider>,
  document.getElementById('app')
);

// ReactDOM.render(
//   <div>abcd</div>,
//   document.getElementById('app')
// );




