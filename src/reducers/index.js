const initialState = {
  Styczeń: [
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
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_WORK_HOURS': {
      return {};
    }
    default:
      return state;
  }
};

export default rootReducer;

/* {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter(item => item.id !== action.payload.id),
        ], */
