export const increaseHours = (id, nameOfDay, hours, holiday) => {
  return {
    type: 'INCREASE_WORK_HOURS',
    payload: {
      item: {
        id,
        nameOfDay,
        hours,
        holiday,
      },
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
