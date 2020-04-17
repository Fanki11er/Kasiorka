/*export const addCardSettings = (data) => {
  //Add new property to money
  if (data.moneyVersion < 0.5 || data.moneyVersion === undefined) {
    const { months } = data;
    for (let i = 0; i < 12; i++) {
      if (!months[i].mainAccount.cardSettings) months[i].mainAccount.cardSettings = { debit: 0 };
    }
  }
};*/

/*export const addVersioningToHours = (data) => {
  if (data.hoursVersion === undefined) {
    data.hoursVersion = 0;
  }
};*/

/*export const addVersioningToMoney = (data) => {
  if (data.moneyVersion === undefined) {
    data.moneyVersion = 0;
  }
};*/
