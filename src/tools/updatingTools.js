export const addCardSettings = (data) => {
  if (data.moneyVersion < 0.5) {
    const { months } = data;
    for (let i = 0; i < 12; i++) {
      if (!months[i].mainAccount.cardSettings) months[i].mainAccount.cardSettings = { debit: 0 };
    }
  }
};
