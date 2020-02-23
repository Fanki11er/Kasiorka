/*import { Money, sumSections, Expense, editExpenseInState } from '../../tools/moneyTools';

const initialState = new Money();

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    /*case 'ADD_EXPENSE': {
      const { selectedMonthId, type } = action.payload.path;

      const month = state.months[selectedMonthId][type[0]][type[1]];
      const sections = state.months[selectedMonthId][type[0]];
      const availableSections = sections.sections;

      const data = action.payload.data;
      month['transactions']
        ? month['transactions'].push(new Expense(data))
        : (month['transactions'] = new Array(new Expense(data)));

      return {
        ...state,
        isSaved: false,
      };
    }*/

/*case 'TEST': {
      const tests = action.payload;
      return {
        ...tests,
        isSaved: false,
      };
    }

    case 'EDIT_EXPENSE': {
      const { selectedMonthId, type, id } = action.payload.path;
      const transaction = state.months[selectedMonthId][type[0]][type[1]].transactions[id];
      const data = action.payload.data;
      const sections = state.months[selectedMonthId][type[0]];
      const availableSections = sections.sections;
      //editExpenseInState(transaction, data);
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

export default testReducer;*/
