import { newYearsListItem } from '../tools/index';

export const takeDataFromDataBase = (uid, year) => {
  return (dispatch, getState, { dataBase, endPoints }) => {
    const state = getState();
    dataBase
      .fetch(endPoints.hours(uid, year), {
        context: state,
      })
      .then(data => {
        dispatch({ type: 'TAKE_HOURS_FROM_DATABASE', payload: data }); // Hours reducer
      });

    dataBase
      .fetch(endPoints.settings(uid), {
        context: state,
      })
      .then(data => {
        dispatch({ type: 'TAKE_USER_SETTINGS_FROM_DATABASE', payload: data }); // User reducer
      });
  };
};

export const sendHoursToDataBase = uid => {
  return (dispatch, getState, { dataBase, endPoints }) => {
    const state = getState();
    const yearToSave = state.hours.yearName;
    dataBase
      .update(endPoints.hours(uid, yearToSave), {
        data: state.hours,
      })
      .then(() => {
        dispatch({ type: 'SAVED_SUCCESS' }); // Hours reducer
      })
      .catch(err => {
        dispatch({ type: 'HOURS_NOT_SAVED', payload: err }); // Errors Reducer
      });
  };
};

export const addNewYear = year => {
  return (dispatch, getState, { dataBase, endPoints }) => {
    const state = getState();
    const uid = state.firebase.auth.uid;
    const yearToAdd = year.yearName;
    const yearsList = state.user.yearsList;

    dataBase
      .update(endPoints.hours(uid, yearToAdd), {
        data: year,
      })
      .then(() => {
        dispatch({ type: 'NEW_YEAR_ADDED' }); // User reducer
        dataBase
          .update(endPoints.yearsList(uid), {
            data: newYearsListItem(yearsList, yearToAdd),
          })
          .then(() => {
            dispatch({ type: 'ACTUALIZE_YEARS_LIST', payload: yearToAdd }); // User reducer
          })
          .catch(err => {
            dispatch({ type: 'YEAR_NOT_ADDED_TO_LIST', payload: err }); // Errors reducer
          });
      })
      .catch(err => {
        dispatch({ type: 'NEW_YEAR_NOT_ADDED', payload: err }); // Errors reducer
      });
  };
};
