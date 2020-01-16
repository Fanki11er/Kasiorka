import { createNewYear, monthNames } from '../tools/index';
import { addHolidaysToYear, constantPolishHolidays } from '../tools/holidayTools';

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, dataBase }) => {
    const firebase = getFirebase();
    const year = new Date().getFullYear();
    const newYear = createNewYear(monthNames, year);
    const months = newYear.months;
    addHolidaysToYear(year, months, constantPolishHolidays);
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        dataBase.update('Users', {
          data: {
            [resp.user.uid]: {
              settings: {
                name: newUser.name,
                yearsList: [newYear.yearName],
              },
              years: {
                [newYear.yearName]: {
                  hours: newYear,
                  money: 'None',
                },
              },
            },
          },
        });
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};

export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'LOGOUT SUCCESS' });
      });
  };
};
