import { combineReducers } from 'redux';

// Reducers
import testReducer from './testReducer.jsx';
// import userReducer from './user-reducer';
// import widgetReducer from './widget-reducer';
// import searchLayoutReducer from './search-layout-reducer';

// Combine Reducers
var reducers = combineReducers({
  testState: testReducer
  // userState: userReducer,
  // widgetState: widgetReducer,
  // searchLayoutState: searchLayoutReducer
});

export default reducers;