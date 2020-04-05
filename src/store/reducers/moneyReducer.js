const initialState = { isSaved: true, isLoading: false };
const moneyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TAKE_MONEY_FROM_DATABASE': {
      state = action.payload;

      return {
        ...state,
        isSaved: true,
      };
    }
    case 'MONEY_ADDED': {
      return state;
    }

    case 'SAVED_SUCCESS2': {
      return { ...state, isSaved: true };
    }

    case 'CALCULATE_TRANSACTIONS': {
      const state = action.payload;
      return {
        ...state,
        isSaved: false,
      };
    }
    case 'RECALCULATE_MONEY': {
      const state = action.payload;
      return {
        ...state,
        isSaved: false,
      };
    }
    case 'START_DOWNLOADING': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'DATA_DOWNLOADED': {
      return {
        ...state,
        isLoading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default moneyReducer;
