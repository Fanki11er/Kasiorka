const initialState = { isSaved: true };
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
    default: {
      return state;
    }
  }
};

export default moneyReducer;
