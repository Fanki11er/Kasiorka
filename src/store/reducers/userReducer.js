const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TAKE_USER_SETTINGS_FROM_DATABASE': {
      state = action.payload;
      console.log('User', state);

      return state;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
