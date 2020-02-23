import { Money } from '../../tools/moneyTools';
//const initialState = { isSaved: true };
const initialState = new Money();
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

    case 'CALCULATE_TRANSACTIONS': {
      const state = action.payload;
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

export default moneyReducer;
