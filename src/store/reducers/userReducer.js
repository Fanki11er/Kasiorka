const initialState = {
  yearsList: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TAKE_USER_SETTINGS_FROM_DATABASE': {
      state = action.payload;

      return state;
    }
    case 'ACTUALIZE_YEARS_LIST': {
      const yearsList = state.yearsList;
      return {
        ...state,
        yearsList: [...yearsList, action.payload],
      };
    }

    case 'NEW_YEAR_ADDED': {
      return state;
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
