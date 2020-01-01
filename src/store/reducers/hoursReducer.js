import { replaceDayValue, findIndexToChange } from '../../tools/index';
const initialState = {};

const hoursReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TAKE_HOURS_FROM_DATABASE': {
      state = action.payload;
      return state;
    }
    case 'UPDATE_WORK_HOURS': {
      const monthId = action.payload.monthId;
      const newValue = action.payload.item;
      replaceDayValue(state.months[monthId].days, newValue, findIndexToChange);
      return { ...state };
    }

    default: {
      return state;
    }
  }
};

export default hoursReducer;
