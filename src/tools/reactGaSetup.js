import ReactGA from 'react-ga';

//const testTrackingId = 'UA-155052927-3';
const TrackingId = 'UA-155052927-2';

export const initGA = () => {
  ReactGA.initialize(TrackingId);
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
