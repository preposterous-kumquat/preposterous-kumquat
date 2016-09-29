import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import router from './router.jsx';
import store from './store.jsx';

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);

// ReactDOM.render(
//   <div>abcd</div>,
//   document.getElementById('app')
// );




