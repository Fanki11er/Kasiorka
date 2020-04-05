const initialState = {
  prevPayments: {
    paymentReceived: 0,
    expectedPayout: 0,
  },
  prevMoney: {
    monthTotal: 0,
    monthTotalPredicted: 0,
    debitCardPredicted: 0,
  },
  prevPaymentsReady: false,
  prevMoneyReady: false,
};
const prevYearReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PREVIOUS_PAYMENTS': {
      return {
        ...state,
        prevPayments: action.payload,
      };
    }

    case 'GET_PREVIOUS_AMOUNTS': {
      return {
        ...state,
        prevMoney: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default prevYearReducer;
