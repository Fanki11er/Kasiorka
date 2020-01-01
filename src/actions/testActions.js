import { createNewYear, monthNames } from '../tools/index';
import YearsMenu from '../components/molecules/YearsMenu/YearsMenu';
export const addTest = () => {
  return (dispatch, getState, { dataBase }) => {
    const year = createNewYear(monthNames, 2019);
    dataBase
      .update('Users', {
        data: {
          ['User3']: {
            name: 'User3',
            years: {
              [year.yearName]: {
                hours: year,
                money: 'None',
              },
            },
          },
        },
      })
      .then(() => {
        console.log('Test successes');
      })
      .catch(err => {
        console.log('Test failed', err);
      });
  };
};

export const syncBaseWithState = () => {
  return (dispatch, getState, { dataBase }) => {
    const state = getState();
    dataBase
      .fetch('Users/User3/years/2019/hours', {
        context: state,
      })
      .then(data => {
        dispatch({ type: 'TEST', payload: data });
      });

    dataBase
      .fetch('Users/User3/Settings', {
        context: state,
      })
      .then(data => {
        dispatch({ type: 'USER', payload: data });
      });
  };
};
