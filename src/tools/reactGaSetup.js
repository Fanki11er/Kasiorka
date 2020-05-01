import ReactGA from 'react-ga';

//const TrackingId = 'UA-155052927-3'; //! For tests
const TrackingId = 'UA-155052927-2'; //! Real

export const initGA = (uid = '') => {
  ReactGA.initialize(TrackingId, {
    gaOptions: {
      userId: uid,
    },
  });
};

export const pageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export const eventGa = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
