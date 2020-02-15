export const editExpense = (data, path) => {
  return {
    type: 'EDIT_EXPENSE',
    payload: {
      data,
      path,
    },
  };
};

export const addExpense = (data, path) => {
  return {
    type: 'ADD_EXPENSE',
    payload: {
      data,
      path,
    },
  };
};
