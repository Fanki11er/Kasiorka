import { newYearsListItem } from '../tools/index';

export const takeDataFromDataBase = (uid, year) => {
  return (dispatch, getState, { dataBase }) => {
    const state = getState();
    dataBase
      .fetch(`Users/${uid}/years/${year}/hours`, {
        context: state,
      })
      .then(data => {
        dispatch({ type: 'TAKE_HOURS_FROM_DATABASE', payload: data });
      });

    dataBase
      .fetch(`Users/${uid}/settings`, {
        context: state,
      })
      .then(data => {
        dispatch({ type: 'TAKE_USER_SETTINGS_FROM_DATABASE', payload: data });
      });
  };
};

export const sendHoursToDataBase = uid => {
  return (dispatch, getState, { dataBase }) => {
    const state = getState();
    //TODO: Check if state was changed, add bool to state and dispatch action
    const yearToSave = state.hours.yearName;
    dataBase
      .update(`Users/${uid}/years/${yearToSave}/hours`, {
        data: state.hours,
      })
      .then(() => {
        console.log('SAVED_SUCCESS');
      })
      .catch(err => {
        console.log('SAVE ERR', err);
      });
  };
};

export const addNewYear = year => {
  return (dispatch, getState, { dataBase }) => {
    const state = getState();
    const uid = state.firebase.auth.uid;
    const yearToAdd = year.yearName;
    const yearsList = state.user.yearsList;

    dataBase
      .update(`Users/${uid}/years/${yearToAdd}/hours`, {
        data: year,
      })
      .then(() => {
        dispatch({ type: 'NEW_YEAR_ADDED' });
        dataBase
          .update(`Users/${uid}/settings/yearsList`, {
            data: newYearsListItem(yearsList, yearToAdd),
          })
          .then(() => {
            dispatch({ type: 'ACTUALIZE_YEARS_LIST', payload: yearToAdd });
          })
          .catch(err => {
            dispatch({ type: 'YEAR_NOT_ADDED_TO_LIST', payload: err });
          });
      })
      .catch(err => {
        dispatch({ type: 'NEW_YEAR_NOT_ADDED', payload: err });
      });
  };
};
