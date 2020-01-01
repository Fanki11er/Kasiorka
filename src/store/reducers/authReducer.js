const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS': {
      return state;
    }

    case 'LOGOUT SUCCESS': {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
