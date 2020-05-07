const initialState = { isSaved: true };

const hoursReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TAKE_HOURS_FROM_DATABASE': {
      const newState = action.payload;
      return { ...newState, isSaved: true };
    }
    case 'UPDATE_WORK_HOURS': {
      const newState = action.payload;

      return { ...newState, isSaved: false };
    }

    case 'HOURS_SAVED_SUCCESS': {
      return { ...state, isSaved: true };
    }

    case 'UPDATE_SALARY_VALUE': {
      const newSate = action.payload;
      return { ...newSate, isSaved: false };
    }

    case 'CHANGE_PAYMENT_VALUE': {
      const newState = action.payload;
      return { ...newState, isSaved: false };
    }

    case 'AUTO_FILL_HOURS_MONTH': {
      const newState = action.payload;
      return {
        ...newState,
        isSaved: false,
      };
    }
    case 'HOURS_VERSION_UPDATED': {
      return {
        ...state,
        isSaved: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default hoursReducer;
