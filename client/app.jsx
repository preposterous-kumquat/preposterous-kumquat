import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import router from './router.jsx';
// import store from './store.jsx';
import reducers from './reducers/reducers.jsx';
import { createStore } from 'redux';

ReactDOM.render(
  <Provider store={ createStore(reducers) }>
    {router}
  </Provider>,
  document.getElementById('app')
);

// ReactDOM.render(
//   <div>abcd</div>,
//   document.getElementById('app')
// );




