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
          nameOfDay: 'ŚR',
          hours: 9,
          holiday: false,
        },
        {
          id: 4,
          nameOfDay: 'CZ',
          hours: 0,
          holiday: false,
        },
        {
          id: 5,
          nameOfDay: 'PT',
          hours: 0,
          holiday: false,
        },
        {
          id: 6,
          nameOfDay: 'SO',
          hours: 0,
          holiday: false,
        },
        {
          id: 7,
          nameOfDay: 'ND',
          hours: 0,
          holiday: true,
        },
        {
          id: 8,
          nameOfDay: 'PN',
          hours: 0,
          holiday: false,
        },
        {
          id: 9,
          nameOfDay: 'WT',
          hours: 0,
          holiday: false,
        },
      ],
    },
  ],
};

const rootReducer = (state = initialState, action) => {
  return state;
};

export default rootReducer;
