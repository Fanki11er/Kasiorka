export const updateHours = (dayId, nameOfDay, workHours, isHoliday, action) => {
  if (action === '+') workHours++;
  else if (action === '-' && workHours > 0) workHours--;
  return {
    type: 'UPDATE_WORK_HOURS',
    payload: {
      item: {
        dayId,
        nameOfDay,
        workHours,
        isHoliday,
      },
    },
  };
};

/*export const updateHours = (dayId, nameOfDay, workHours, isHoliday, action) => {
  if (action === '+') workHours++;
  else if (action === '-' && workHours > 0) workHours--;
  return {
    type: 'UPDATE_WORK_HOURS',
    payload: {
      item: {
        dayId,
        nameOfDay,
        workHours,
        isHoliday,
      },
    },
  };
}; */
