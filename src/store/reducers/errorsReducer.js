const initialState = {
  authErr: null,
  listErr: null,
  newYearErr: null,
  saveHoursErr: null,
  signUpErr: null,
  settingsErr: null,
  settingsFetchErr: null,
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
        authErr: null,
      };
    }
    case 'LOGIN_ERROR': {
      return {
        ...state,
        authErr: action.err.message,
      };
    }

    case 'SIGNUP_ERROR': {
      return {
        ...state,
        signUpErr: action.err.message,
      };
    }

    case 'HOURS_SETTINGS_NOT_ACTUAL': {
      return {
        ...state,
        settingsFetchErr: action.err.message,
      };
    }

    case 'HOURS_SETTINGS_NOT_CHANGED': {
      return {
        ...state,
        settingsErr: action.err.message,
      };
    }

    default: {
      return state;
    }
  }
};

export default errorsReducer;
