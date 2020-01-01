const initialState = {
  authErr: null,
  listErr: null,
  newYearErr: null,
  saveHoursErr: null,
  signUpErr: null,
};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'YEAR_NOT_ADDED_TO_LIST': {
      return {
        ...state,
        listErr: action.payload,
      };
    }
    case 'NEW_YEAR_NOT_ADDED': {
      return {
        ...state,
        newYearErr: action.payload,
      };
    }
    case 'HOURS_NOT_SAVED': {
      return {
        ...state,
        saveHoursErr: action.payload,
      };
    }
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        authError: null,
      };
    }
    case 'LOGIN_ERROR': {
      return {
        ...state,
        authError: action.err.message,
      };
    }

    case 'SIGNUP_ERROR': {
      return {
        ...state,
        signUpErr: action.err.message,
      };
    }

    default: {
      return state;
    }
  }
};

export default errorsReducer;
