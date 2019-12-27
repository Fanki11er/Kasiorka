const initialState = {
  authError: null,
};

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
    case 'LOGIN_SUCCESS': {
      console.log('LOGIN_SUCCESS');
      return {
        ...state,
        authError: null,
      };
    }
    case 'LOGIN_ERROR': {
      console.log('LOGIN_ERROR', action.err);
      return {
        ...state,
        authError: action.err.message,
      };
    }
    case 'LOGOUT SUCCESS': {
      console.log('LOGOUT SUCCESS');
      return state;
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
