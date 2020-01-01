const initialState = {};

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
        ['yearsList']: [...yearsList, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
