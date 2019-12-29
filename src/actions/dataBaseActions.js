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
