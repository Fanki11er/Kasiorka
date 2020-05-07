import {
  updateWorkHours,
  updateTotalHours,
  computeExpectedPayout,
  updateSalaryValue,
  updatePaymentValue,
  autoFillHoursMonth,
} from '../tools/hoursTools';
import { copyObj } from '../tools/index';

export const updateHours = (monthId, dayId, action) => {
  return (dispatch, getState) => {
    const { hours } = getState();
    const newHours = copyObj(hours);
    const { months } = newHours;
    const month = months[monthId];

    updateWorkHours(month, dayId, action);
    updateTotalHours(month);
    computeExpectedPayout(month);

    dispatch({ type: 'UPDATE_WORK_HOURS', payload: newHours });
  };
};

export const changePaymentReceived = (newPaymentValue, monthId) => {
  return (dispatch, getState) => {
    const { hours } = getState();
    const newHours = copyObj(hours);
    const { months } = newHours;
    const month = months[monthId];

    updatePaymentValue(month, newPaymentValue);

    dispatch({ type: 'CHANGE_PAYMENT_VALUE', payload: newHours });
  };
};

export const monthHoursAutoFill = (monthId, userHoursSettings) => {
  return (dispatch, getState) => {
    const { hours } = getState();
    const newHours = copyObj(hours);
    const { months } = newHours;
    const month = months[monthId];

    autoFillHoursMonth(month, userHoursSettings);
    updateTotalHours(month);
    computeExpectedPayout(month);

    dispatch({ type: 'AUTO_FILL_HOURS_MONTH', payload: newHours });
  };
};

export const changeSalaryValue = (newSalaryValue, monthId) => {
  return (dispatch, getState) => {
    const { hours } = getState();
    const newHours = copyObj(hours);
    const { months } = newHours;
    const month = months[monthId];

    updateSalaryValue(month, newSalaryValue);
    computeExpectedPayout(month);

    dispatch({ type: 'UPDATE_SALARY_VALUE', payload: newHours });
  };
};
