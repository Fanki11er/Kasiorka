export const updateHours = (monthId, dayId, nameOfDay, workHours, isHoliday, action) => {
  if (action === '+') workHours++;
  else if (action === '-' && workHours > 0) workHours--;
  return {
    type: 'UPDATE_WORK_HOURS',
    payload: {
      monthId,
      actionPerformed: action,
      item: {
        dayId,
        nameOfDay,
        workHours,
        isHoliday,
      },
    },
  };
};

export const changeSalaryValue = (newSalaryValue, monthId) => {
  return {
    type: 'CHANGE_SALARY_VALUE',
    payload: {
      newSalaryValue,
      monthId,
    },
  };
};

export const changePaymentReceived = (newPaymentValue, monthId) => {
  return {
    type: 'CHANGE_PAYMENT_VALUE',
    payload: {
      newPaymentValue,
      monthId,
    },
  };
};
