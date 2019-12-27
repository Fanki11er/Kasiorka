import { createNewYear, monthNames } from '../tools/index';

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const year = new Date().getFullYear();
    const newYear = createNewYear(monthNames, year);
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection('users')
          .doc(resp.user.uid)
          .set({
            name: newUser.name,
            years: [year],
          })
          .then(() => {
            return firestore
              .collection('years')
              .doc(resp.user.uid)
              .set({
                [newYear.yearName]: JSON.stringify(newYear.months),
              })
              .then(() => {
                return firestore
                  .collection('money')
                  .doc(resp.user.uid)
                  .set({
                    [newYear.yearName]: 'None',
                  });
              });
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
