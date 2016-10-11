import { combineReducers } from 'redux';

// Reducers
import testReducer from './testReducer.jsx';
// import userReducer from './user-reducer';
// import widgetReducer from './widget-reducer';
// import searchLayoutReducer from './search-layout-reducer';

let persist = (key, value) => localStorage.setItem(key, value);

let restore = key => localStorage.getItem(key);

let restoreDefault = (key, def) => {
  let stored = restore(key);
  return stored !== null
    ? JSON.parse(stored)
    : def;
};

const userInitState = restoreDefault('user', {
  auth: false,
  name: '',
  email: '',
  userPhotos: []
});

const imgInitState = restoreDefault('img', {
  file: '',
  imgThumb: '',
  imgStack: [],
  pairPic1: {},
  pairPic2: {}
});

// The User Reducer
const userReducer = function(state = userInitState, action) {
  //console.log('reducer', action.hasAuth);

  switch (action.type) {
    case 'USER_SIGNIN':
      state = { ...state, auth: true, name: action.name, email: action.email };
      break;
    case 'USER_SIGNOUT':
      // state = { ...state, auth: false, name: '', email: '', userPhotos: [] };
      state = userInitState;
      break;
    case 'USER_PHOTOS':
      state = { ...state, userPhotos: action.userPhotos };
      break;
  }

  persist('user', JSON.stringify(state));

  return state;
};

const imgReducer = function(state = imgInitState, action) {
  //console.log('reducer', action.hasAuth);
  switch (action.type) {
    case 'IMG_FILE':
      //return Object.assign({}, state, { users: action.users });
      state = { ...state, file: action.file };
      break;
    case 'IMG_THUMB':
      state = { ...state, imgThumb: action.imgThumb };
      break;
    case 'IMG_STACK':
      state = { ...state, imgStack: action.imgStack };
      break;
    case 'PAIR_PIC1':
      state = { ...state, pairPic1: action.pic };
      break;
    case 'PAIR_PIC2':
      state = { ...state, pairPic2: action.pic };
      break;
    case 'REMOVE_PAIR_PIC1':
      state = { ...state, pairPic1: state.pairPic2, pairPic2: {} };
      break;
    case 'REMOVE_PAIR_PIC2':
      state = { ...state, pairPic2: {} };
      break;
    case 'RESET_PIC_PAIR':
      state = { ...state, pairPic1: {}, pairPic2: {} };
      break;
  }
  persist('img', JSON.stringify(state));
  return state;
};

// const imgPairReducer = (state = imgPairInitState, action) => {
//   switch (action.type) {
//   case 'RESET_PIC_PAIR':
//     state = { ...state, pairPic1: {}, pairPic2: {} };
//     break;
//   }
// };
// The Widget Reducer
// const widgetReducer = function(state = {}, action) {
//   return state;
// };


// Combine Reducers
var reducers = combineReducers({
  testState: testReducer,
  userState: userReducer,
  imgState: imgReducer
  // widgetState: widgetReducer,
  // searchLayoutState: searchLayoutReducer
});

export default reducers;