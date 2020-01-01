export const updateHours = (monthId, dayId, nameOfDay, workHours, isHoliday, action) => {
  if (action === '+') workHours++;
  else if (action === '-' && workHours > 0) workHours--;
  return {
    type: 'UPDATE_WORK_HOURS',
    payload: {
      monthId: monthId,
      item: {
        dayId,
        nameOfDay,
        workHours,
        isHoliday,
      },
    },
  };
};

/* firestore
      .collection('years')
      .doc(docId)
      .set({
        months: JSON.stringify(year.months),
      })
      .then(() => {
        dispatch({
          type: 'ADD_NEW_YEAR',
          year,
        });
      })
      .catch(err => {
        dispatch({
          type: 'ERROR',
          err,
        });
      }); */
