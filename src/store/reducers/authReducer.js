const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS': {
      console.log('Sign up Success');
      return state;
    }
    case 'SIGNUP_ERROR': {
      console.log('Sign up Error', action.err);
      return state;
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
