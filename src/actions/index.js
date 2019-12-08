export const increaseHours = dayId => {
  return {
    type: 'INCREASE_WORK_HOURS',
    payload: {
      dayId,
    },
  };
};

/*export const removeItem = (itemType, id) => {
  return {
    type: 'REMOVE_ITEM',
    payload: {
      itemType,
      id,
    },
  };
}; */
