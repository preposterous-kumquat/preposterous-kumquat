var reducer = (state = { text: '' }, action) => {
  switch (action.type) {
    case 'UPDATE_TEXT':
      return { ...state, text: action.text }
      // return Object.assign({}, state, {text: action.text});
    default:
      return state;
  }
};

export default reducer;