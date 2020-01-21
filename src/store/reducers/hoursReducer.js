import {
  replaceWorkHoursValue,
  updateTotalHours,
  updateSalaryValue,
  updatePaymentValue,
  findIndexToChange,
} from '../../tools/index';
import { autoFillHoursMonth, sumWholeMonthWorkHours } from '../../tools/hoursTools';
const initialState = { isSaved: true };

const hoursReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TAKE_HOURS_FROM_DATABASE': {
      state = action.payload;
      return { ...state, isSaved: true };
    }
    case 'UPDATE_WORK_HOURS': {
      const monthId = action.payload.monthId;
      const dayId = action.payload.dayId;
      const newValue = action.payload.workHours;
      const actionPerformed = action.payload.actionPerformed;
      replaceWorkHoursValue(state.months[monthId].days, dayId, findIndexToChange, newValue);
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

    case 'AUTO_FILL_HOURS_MONTH': {
      const monthId = action.payload.monthId;
      const userHoursSettings = action.payload.userHoursSettings;
      const month = state.months[monthId];
      autoFillHoursMonth(month, userHoursSettings);
      sumWholeMonthWorkHours(month);
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

export default hoursReducer;
