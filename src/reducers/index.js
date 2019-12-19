import { createNewYear } from '../tools/index';
import { monthNames } from '../tools/index';
import { replaceDayValue, findIndexToChange } from '../tools/index';

const appState = createNewYear(monthNames, 2019);

const monthReducer = (state = appState.months, action) => {
  switch (action.type) {
    case 'UPDATE_WORK_HOURS': {
      const monthId = action.payload.monthId;
      const newValue = action.payload.item;
      replaceDayValue(state[monthId].days, newValue, findIndexToChange);
      return [...state];
    }
    default:
      return state;
  }
};
export default monthReducer;
