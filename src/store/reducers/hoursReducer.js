import { replaceDayValue, findIndexToChange } from '../../tools/index';
const initialState = { isSaved: true };

const hoursReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TAKE_HOURS_FROM_DATABASE': {
      state = action.payload;
      return { ...state, isSaved: true };
    }
    case 'UPDATE_WORK_HOURS': {
      const monthId = action.payload.monthId;
      const newValue = action.payload.item;
      replaceDayValue(state.months[monthId].days, newValue, findIndexToChange);
      return { ...state, isSaved: false };
    }

    case 'SAVED_SUCCESS': {
      return { ...state, isSaved: true };
    }

    default: {
      return state;
    }
  }
};

export default hoursReducer;
