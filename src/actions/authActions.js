import { createNewYear, monthNames, User } from '../tools/index';
import { addHolidaysToYear, constantPolishHolidays } from '../tools/holidayTools';
import { Money } from '../tools/moneyTools';
import { hoursVersion } from '../tools/hoursTools';

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, dataBase }) => {
    const firebase = getFirebase();
    const year = new Date().getFullYear();
    const newYear = createNewYear(monthNames, year, hoursVersion);
    const money = new Money();
    const months = newYear.months;
    const user = new User(newUser.name, [newYear.yearName]);
    addHolidaysToYear(year, months, constantPolishHolidays);
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        dataBase.update('Users', {
          data: {
            [resp.user.uid]: {
              settings: user,

              years: {
                [newYear.yearName]: {
                  hours: newYear,
                  money,
                },
              },
            },
          },
        });
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().signOut();
  };
};
