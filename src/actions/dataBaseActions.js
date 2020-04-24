import { newYearsListItem, checkForUpdates } from '../tools/index';
import { addHolidaysToYear, constantPolishHolidays } from '../tools/holidayTools';
import { Money, moneyVersion, moneyUpdatesArray } from '../tools/moneyTools';
import { hoursUpdatesArray, hoursVersion } from '../tools/hoursTools';

export const takeDataFromDataBase = (uid, year) => {
  return (dispatch, getState, { dataBase, endPoints }) => {
    const state = getState();
    dispatch({ type: 'START_DOWNLOADING' }); // money reducer
    Promise.all([
      dataBase
        .fetch(endPoints.hours(uid, year), {
          context: state,
        })
        .then((data) => {
          const dataObj = checkForUpdates(data, hoursVersion, 'hours', hoursUpdatesArray);
          dispatch({ type: 'TAKE_HOURS_FROM_DATABASE', payload: dataObj.data }); // Hours reducer
          if (dataObj.updated) dispatch({ type: 'HOURS_VERSION_UPDATED' });
        })
        .catch((err) => {
          dispatch({ type: 'HOURS_NOT_TOOK' });
        }),

      dataBase
        .fetch(endPoints.settings(uid), {
          context: state,
        })
        .then((data) => {
          dispatch({ type: 'TAKE_USER_SETTINGS_FROM_DATABASE', payload: data }); // User reducer
        }),

      dataBase
        .fetch(endPoints.money(uid, year), {
          context: state,
        })
        .then((data) => {
          const dataObj = checkForUpdates(data, moneyVersion, 'money', moneyUpdatesArray);
          dispatch({ type: 'TAKE_MONEY_FROM_DATABASE', payload: dataObj.data }); //Money Reducer
          if (dataObj.updated) dispatch({ type: 'MONEY_VERSION_UPDATED' });
        })
        .catch((err) => {
          dispatch({ type: 'MONEY_NOT_TOOK' });
        }),

      dataBase
        .fetch(endPoints.previousHours(uid, year - 1), {
          context: state,
        })
        .then((data) => {
          dispatch({ type: 'GET_PREVIOUS_PAYMENTS', payload: data }); // prev reducer
        })
        .catch((err) => {
          dispatch({ type: 'PREVIOUS_PAYMENTS_NOT_TOOK' });
        }),

      dataBase
        .fetch(endPoints.previousMoney(uid, year - 1), {
          context: state,
        })
        .then((data) => {
          dispatch({ type: 'GET_PREVIOUS_AMOUNTS', payload: data }); // prev reducer
        })
        .catch((err) => {
          dispatch({ type: 'PREVIOUS_AMOUNTS_NOT_TOOK' });
        }),
    ]).then(() => {
      dispatch({ type: 'DATA_DOWNLOADED' }); // money reducer
    });
  };
};

export const sendHoursToDataBase = (uid) => {
  return (dispatch, getState, { dataBase, endPoints }) => {
    const state = getState();
    const yearToSave = state.hours.yearName;
    dataBase
      .update(endPoints.hours(uid, yearToSave), {
        data: state.hours,
      })
      .then(() => {
        dispatch({ type: 'HOURS_SAVED_SUCCESS' }); // Hours reducer
      })
      .catch((err) => {
        dispatch({ type: 'HOURS_NOT_SAVED', payload: err }); // Errors Reducer
      });
  };
};

export const sendMoneyToDataBase = (uid) => {
  return (dispatch, getState, { dataBase, endPoints }) => {
    const state = getState();
    const yearToSave = state.hours.yearName;
    dataBase
      .update(endPoints.money(uid, yearToSave), {
        data: state.money,
      })
      .then(() => {
        dispatch({ type: 'MONEY_SAVED_SUCCESS' }); // Money reducer
      })
      .catch((err) => {
        dispatch({ type: 'MONEY_NOT_SAVED', payload: err }); // Errors Reducer
      });
  };
};

export const addNewYear = (year) => {
  return (dispatch, getState, { dataBase, endPoints }) => {
    const state = getState();
    const money = new Money();
    const uid = state.firebase.auth.uid;
    const yearToAdd = year.yearName;
    const yearsList = state.user.yearsList;
    const months = year.months;
    addHolidaysToYear(yearToAdd, months, constantPolishHolidays);

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
          .catch((err) => {
            dispatch({ type: 'YEAR_NOT_ADDED_TO_LIST', payload: err }); // Errors reducer
          });
        dataBase
          .update(endPoints.money(uid, yearToAdd), {
            data: money,
          })
          .then(() => {
            dispatch({ type: 'MONEY_ADDED' }); // Money reducer
          })
          .catch((err) => {
            dispatch({ type: 'MONEY_NOT_ADDED', payload: err }); // Errors reducer
          });
      })
      .catch((err) => {
        dispatch({ type: 'NEW_YEAR_NOT_ADDED', payload: err }); // Errors reducer
      });
  };
};

export const updateUserSettings = (newSettings) => {
  return (dispatch, getState, { dataBase, endPoints }) => {
    const state = getState();
    const uid = state.firebase.auth.uid;
    dataBase
      .update(endPoints.hoursSettings(uid), {
        data: newSettings,
      })
      .then(() => {
        dispatch({ type: 'HOURS_SETTINGS_CHANGED' }); // User reducer
        dataBase
          .fetch(endPoints.hoursSettings(uid), {
            context: state,
          })
          .then((data) => {
            dispatch({ type: 'ACTUALIZE_HOURS_SETTINGS', payload: data }); // User reducer
          })
          .catch((err) => {
            dispatch({ type: 'HOURS_SETTINGS_NOT_ACTUAL', payload: err }); // Errors reducer
          });
      })
      .catch((err) => {
        dispatch({ type: 'HOURS_SETTINGS_NOT_CHANGED', payload: err }); // Errors reducer
      });
  };
};
