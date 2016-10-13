import { combineReducers } from 'redux';

// Reducers
// import testReducer from './testReducer.jsx';

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
  pairPic2: {},
  pairViewPic1: {},
  pairViewPic2: {},
  mapURL: '',
  pairTheme: '',
  allPairs: [],
  imgFeature: '',
  imgSlideshow: '',
  imgTheme: ''
});

// The User Reducer
const userReducer = function(state = userInitState, action) {
  //console.log('reducer', action.hasAuth);

  switch (action.type) {
    case 'USER_SIGNIN':
      state = { ...state, auth: true, name: action.name, email: action.email };
      break;
    case 'USER_SIGNOUT':
      state = { ...state, auth: false, name: '', email: '', userPhotos: [] };
      // state = userInitState;
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
    case 'GET_PAIR':
      state = { ...state, pairViewPic1: action.pic1, pairViewPic2: action.pic2, mapURL: action.mapURL, pairTheme: action.theme };
      break;
    case 'GET_ALL_PAIRS':
      state = { ...state, allPairs: action.pairs };
      break;
    case 'FEATURE_PHOTO':
      state = { ...state, imgFeature: action.feature };
      break;
    case 'IMG_SLIDESHOW':
      state = { ...state, imgSlideshow: action.slideshow };
      break;
    case 'IMG_THEME':
      state = { ...state, imgTheme: action.theme };
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

// Combine Reducers
var reducers = combineReducers({
  userState: userReducer,
  imgState: imgReducer
});

export default reducers;