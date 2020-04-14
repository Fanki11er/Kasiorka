export const addCardSettings = (data) => {
  console.log('UPD_FUNC');
  console.log(data.moneyVersion);
  if (data.moneyVersion < 0.5 || data.moneyVersion === undefined) {
    console.log('IF');
    const { months } = data;
    for (let i = 0; i < 12; i++) {
      if (!months[i].mainAccount.cardSettings) months[i].mainAccount.cardSettings = { debit: 0 };
    }
  }
};
