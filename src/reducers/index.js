const initialState = {
  months: [
    {
      id: 1,
      nameOfMonth: 'Styczeń',
      days: [
        {
          id: 1,
          nameOfDay: 'PN',
          hours: 9,
          holiday: false,
        },
        {
          id: 2,
          nameOfDay: 'WT',
          hours: 9,
          holiday: false,
        },
        {
          id: 3,
          nameOfDay: 'Śr',
          hours: 9,
          holiday: false,
        },
        {
          id: 4,
          nameOfDay: 'ND',
          hours: 0,
          holiday: true,
        },
      ],
    },
  ],
};

const rootReducer = (state = initialState, action) => {
  return state;
};

export default rootReducer;
