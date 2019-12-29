const initialState = {};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TAKE_HOURS_FROM_DATABASE': {
      state = action.payload;
      return state;
    }

    default: {
      return state;
    }
  }
};

export default testReducer;
