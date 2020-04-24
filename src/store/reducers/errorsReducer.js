const initialState = {
  authErr: null,
  listErr: null,
  newYearErr: null,
  saveHoursErr: null,
  signUpErr: null,
  settingsErr: null,
  settingsFetchErr: null,
  moneyErr: null,
  calculatingErr: null,
  debitCardErr: null,
  hoursErr: null,
  prevAmountsErr: null,
  prevPaymentsErr: null,
};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'YEAR_NOT_ADDED_TO_LIST': {
      return {
        ...state,
        listErr: 'Nie udało się dodać nowego roku do listy',
      };
    }
    case 'NEW_YEAR_NOT_ADDED': {
      return {
        ...state,
        newYearErr: 'Nie udało się dodać nowego roku',
      };
    }
    case 'HOURS_NOT_SAVED': {
      return {
        ...state,
        saveHoursErr: 'Nie udało się zapisać godzin',
      };
    }
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        authErr: null,
      };
    }
    case 'LOGIN_ERROR': {
      let message = '';
      switch (action.err.code) {
        case 'auth/user-not-found': {
          message = 'Nie prawidłowe dane logowania';
          break;
        }
        case 'auth/invalid-email': {
          message = 'Nie prawidłowe dane logowania';
          break;
        }
        case 'auth/wrong-password': {
          message = 'Nie prawidłowe dane logowania';
          break;
        }
        default: {
          message = 'Nieznany błąd';
        }
      }
      return {
        ...state,
        authErr: message,
      };
    }

    case 'SIGNUP_ERROR': {
      let message = '';
      switch (action.err.code) {
        case 'auth/email-already-in-use': {
          message = 'Adres e-mail jest już wykożystany';
          break;
        }
        default: {
          message = 'Nieznany błąd';
          break;
        }
      }
      return {
        ...state,
        signUpErr: message,
      };
    }

    case 'HOURS_SETTINGS_NOT_ACTUAL': {
      return {
        ...state,
        settingsFetchErr: 'Nie udało się pobrać usawień',
      };
    }

    case 'HOURS_SETTINGS_NOT_CHANGED': {
      return {
        ...state,
        settingsErr: 'Nie udało się zaktualizować ustawień',
      };
    }

    case 'MONEY_NOT_ADDED': {
      return {
        ...state,
        moneyErr: 'Nie udało się dodać modułu MONEY',
      };
    }

    case 'CANT_RECALCULATE': {
      return {
        ...state,
        calculatingErr: 'Nie można przekalkulować',
      };
    }
    case 'TOO_BIG_AMOUNT_OF_DEBIT_ON_CARD': {
      if (state.debitCardErr === null)
        return {
          ...state,
          debitCardErr:
            'Kwota na karcie przewyższa wartość debetu, wykonaj transakcję korygującą na karcie debetowej i/lub na koncie głównym',
        };
      return state;
    }
    case 'HOURS_NOT_TOOK': {
      return {
        ...state,
        hoursErr: 'Nie udało się pobrać modułu "Godziny"',
      };
    }

    case 'MONEY_NOT_TOOK': {
      return {
        ...state,
        moneyErr: 'Nie udało się pobrać modułu "Kasiorka"',
      };
    }

    case 'PREVIOUS_PAYMENTS_NOT_TOOK': {
      return {
        ...state,
        prevPaymentsErr: 'Nie udało się pobrać poprzednich wypłat',
      };
    }

    case 'PREVIOUS_AMOUNTS_NOT_TOOK': {
      return {
        ...state,
        prevAmountsErr: 'Nie udało się pobrać poprzednich wartości',
      };
    }

    default: {
      return state;
    }
  }
};

export default errorsReducer;
