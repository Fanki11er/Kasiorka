import {
  replaceDayValue,
  findIndexToChange,
  updateTotalHours,
  updateSalaryValue,
  updatePaymentValue,
} from '../../tools/index';
const initialState = { isSaved: true, test: '' };

const hoursReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TAKE_HOURS_FROM_DATABASE': {
      state = action.payload;
      return { ...state, isSaved: true };
    }
    case 'UPDATE_WORK_HOURS': {
      const monthId = action.payload.monthId;
      const newValue = action.payload.item;
      const actionPerformed = action.payload.actionPerformed;
      replaceDayValue(state.months[monthId].days, newValue, findIndexToChange);
      updateTotalHours(state.months[monthId], actionPerformed);
      return { ...state, isSaved: false };
    }

    case 'SAVED_SUCCESS': {
      return { ...state, isSaved: true };
    }

    case 'CHANGE_SALARY_VALUE': {
      const monthId = action.payload.monthId;
      const newSalaryValue = action.payload.newSalaryValue;
      updateSalaryValue(state.months[monthId], newSalaryValue);
      return { ...state, isSaved: false };
    }

    case 'CHANGE_PAYMENT_VALUE': {
      const monthId = action.payload.monthId;
      const newPaymentValue = action.payload.newPaymentValue;
      updatePaymentValue(state.months[monthId], newPaymentValue);
      return { ...state, isSaved: false };
    }

    default: {
      return state;
    }
  }
};

export default hoursReducer;
