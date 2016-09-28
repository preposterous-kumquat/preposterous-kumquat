
import { createStore } from 'redux';
import reducers from './reducers/reducers.jsx';

const store = createStore(reducers);
export default store;