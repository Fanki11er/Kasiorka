import { editExpenseInState, Expense } from '../../tools/moneyTools';
const initialState = { isSaved: true };
const moneyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TAKE_MONEY_FROM_DATABASE': {
      state = action.payload;
      return {
        ...state,
        isSaved: true,
      };
    }
    case 'MONEY_ADDED': {
      return state;
    }

    case 'EDIT_EXPENSE': {
      const { selectedMonthId, type, id } = action.payload.path;
      const month = state.months[selectedMonthId][type[0]][type[1]].expenses[id];
      const data = action.payload.data;
      editExpenseInState(month, data);
      return {
        ...state,
        isSaved: false,
      };
    }

    case 'ADD_EXPENSE': {
      const { selectedMonthId, type } = action.payload.path;

      const month = state.months[selectedMonthId][type[0]][type[1]];

      const data = action.payload.data;
      month['expenses']
        ? month['expenses'].push(new Expense(data))
        : (month['expenses'] = new Array(new Expense(data)));
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

export default moneyReducer;
