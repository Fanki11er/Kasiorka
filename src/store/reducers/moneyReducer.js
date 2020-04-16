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

    case 'MONEY_SAVED_SUCCESS': {
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
    case 'SET_NEW_DEBITS': {
      const state = action.payload;
      return {
        ...state,
        isSaved: false,
      };
    }

    case 'MONEY_VERSION_UPDATED': {
      return {
        ...state,
        updated: true,
      };
    }

    default: {
      return state;
    }
  }
};

export default moneyReducer;
