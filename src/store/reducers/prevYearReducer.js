const initialState = {};
const prevYearReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PREVIOUS_PAYMENTS': {
      return {
        ...state,
        prevPayments: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default prevYearReducer;
