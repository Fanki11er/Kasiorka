const hours = (uid, year) => {
  return `Users/${uid}/years/${year}/hours`;
};

const yearsList = uid => {
  return `Users/${uid}/settings/yearsList`;
};

const settings = uid => {
  return `Users/${uid}/settings`;
};

const dataBaseEndPints = {
  yearsList,
  hours,
  settings,
};

export default dataBaseEndPints;
