const hours = (uid, year) => {
  return `Users/${uid}/years/${year}/hours`;
};

const yearsList = uid => {
  return `Users/${uid}/settings/yearsList`;
};

const settings = uid => {
  return `Users/${uid}/settings`;
};

const hoursSettings = uid => {
  return `Users/${uid}/settings/hoursSettings`;
};

const money = (uid, year) => {
  return `Users/${uid}/years/${year}/money`;
};

const previousHours = (uid, year) => {
  return `Users/${uid}/years/${year}/hours/months/11/payments`;
};

const dataBaseEndPints = {
  yearsList,
  hours,
  settings,
  hoursSettings,
  money,
  previousHours,
};

export default dataBaseEndPints;
