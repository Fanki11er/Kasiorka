const initialState = {
  test: null,
};

const testReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case 'TEST': {
      console.log('Tescik', actions.payload);
      state = actions.payload;
      console.log('State', state);
      return state;
    }
    case 'USER': {
      state.test = actions.payload;
      console.log('User', state);
      return state;
    }
    default: {
      return state;
    }
  }
};

export default testReducer;
