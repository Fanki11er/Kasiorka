export const updateHours = (monthId, dayId, workHours, action) => {
  let sendAction;
  if (action === '+' && workHours < 24) {
    workHours++;
    sendAction = '+';
  } else if (action === '-' && workHours > 0) {
    workHours--;
    sendAction = '-';
  } else sendAction = null;
  return {
    type: 'UPDATE_WORK_HOURS',
    payload: {
      monthId,
      dayId,
      workHours,
      actionPerformed: sendAction,
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

export const monthHoursAutoFill = (monthId, userHoursSettings) => {
  return {
    type: 'AUTO_FILL_HOURS_MONTH',
    payload: {
      monthId,
      userHoursSettings,
    },
  };
};
