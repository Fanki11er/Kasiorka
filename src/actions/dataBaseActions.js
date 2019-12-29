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
