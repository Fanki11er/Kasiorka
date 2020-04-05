import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import ExpensesInfo from '../../atoms/ExpensesInfo/ExpensesInfo';
import FormHeader from '../../atoms/FormHeader/FormHeader';
import RadioButton from '../../atoms/RadioButton/RadioButton';
import FormButton from '../../atoms/FormButton/FormButton';
import ExpensesWrapper from '../../atoms/ExpensesWrapper/ExpensesWrapper';
import ExpensesSign from '../../atoms/ExpensesSign/ExpensesSign';
import withExpensesModal from '../../../hoc/withExpensesModal';
import { calculateTransactions as calculateTransactionsAction } from '../../../actions/moneyActions';
import ModalInput from '../../atoms/ModalInput/ModalInput';
import ModalWrapper from '../../atoms/ModalWrapper/ModalWrapper';
import { fixNumber } from '../../../tools/moneyTools';

const StyledFormHeader = styled(FormHeader)`
  margin: 0;
  margin-left: 5%;
  align-self: flex-start;
  transform: translateX(30px);
  font-size: ${({ theme }) => theme.fontSize.verySmall};

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.small};
    transform: translateX(45px);
  }
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 95%;
  margin-top: 30px;
  @media screen and (max-width: 1920px) {
    width: 100%;
    margin-top: 0;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const StyledRowWrapper = styled.div`
  width: 85%;
  display: flex;
  justify-self: center;
  justify-content: space-around;
`;

const StyledInput = styled(Field)`
  min-width: 20%;
  width: 40%;

  font-size: 1.5em;
  font-weight: bold;
  color: ${({ theme }) => theme.green};
  background-color: ${({ theme }) => theme.primary};
  text-align: center;
  border: none;
  outline: none;
  caret-color: ${({ theme }) => theme.hover};

  &::placeholder {
    color: ${({ theme }) => theme.lighterGreen};
  }

  &:focus {
    &::placeholder {
      color: ${({ theme }) => theme.lighterGreen};
    }
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  &.fireFoxNumber {
    -moz-appearance: textfield;
  }

  &.noActive {
    pointer-events: none;
    &::placeholder {
      color: ${({ theme }) => theme.green};
    }
  }

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.small};
  }

  @media screen and (max-width: 767px) {
    width: 45%;
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;

const StyledFormButton = styled(FormButton)`
  transform: translateX(0);
  &.noActive {
    pointer-events: none;
    border: 2px solid gray;
    color: gray;
    opacity: 0.5;
  }
`;

const EditExpensesModal = ({
  predicted,
  real,
  name,
  percentage,
  currency,
  modalInfo: { type, id, action },
  expensesModalContext: { toggleExpensesModal },
  selectedMonthId,
  expenseType,
  calculateTransactions,
  isPeriodClosed,
}) => {
  return (
    <Formik
      initialValues={{
        action: '-',
        real: '',
        predicted: '',
        name: 'Zakupy',
      }}
      validate={(values) => {
        const errors = {};

        if (
          !/^[+]?[0-9]*(\.[0-9]{1,2})?$/.test(values.real) ||
          values.real < 0 ||
          values.real === 'e'
        ) {
          errors.real = true;
        }
        if (
          !/^[+]?[0-9]*(\.[0-9]{1,2})?$/.test(values.predicted) ||
          values.predicted === 'e' ||
          values.predicted < 0
        ) {
          errors.predicted = true;
        }

        if (values.name === '' && action === 'add') {
          errors.name = true;
        }
        if (action === 'payTheCard' && values.real > -predicted) {
          errors.predicted = true;
        }

        if (isPeriodClosed) {
          errors.periodClosed = true;
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const data = {
          real: fixNumber(values.real, 2),
          predicted: fixNumber(values.predicted, 2),
          action: values.action,
          name: values.name || 'none',
        };

        const path = {
          type,
          id,
          selectedMonthId,
        };

        calculateTransactions(data, path, action);
        toggleExpensesModal(null, null, null);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleSubmit, values, errors }) => (
        <ModalWrapper>
          <StyledForm noValidate onSubmit={handleSubmit} autoComplete="off">
            <StyledFormHeader>{name}</StyledFormHeader>
            {action === 'edit' && (
              <ExpensesInfo
                predicted={predicted}
                real={real}
                percentage={percentage}
                units={currency}
              />
            )}

            {(action === 'add' || action === 'addFixed') && (
              <ModalInput label="Opis:" type="text" name="name" />
            )}
            {(action === 'add' || action === 'addFixed') && (
              <StyledRowWrapper>
                <RadioButton
                  name="action"
                  label="Wydatek"
                  checked={values.action === '-' ? true : false}
                  value="-"
                />
                <RadioButton
                  name="action"
                  label="Przychód"
                  value="+"
                  checked={values.action === '+' ? true : false}
                />
              </StyledRowWrapper>
            )}
            {action !== 'payTheCard' && (
              <ExpensesWrapper>
                <ExpensesSign>{action === 'edit' ? expenseType : values.action}</ExpensesSign>
                <StyledInput
                  type={'number'}
                  name="real"
                  placeholder={'Rzeczywista'}
                  className="fireFoxNumber"
                />
                <ExpensesSign>/</ExpensesSign>
                <StyledInput type={'number'} name="predicted" placeholder={'Przewidywana'} />
              </ExpensesWrapper>
            )}
            {action === 'payTheCard' && (
              <ExpensesWrapper>
                <StyledInput type={'number'} name="real" placeholder={'Spłata'} />
                <ExpensesSign>/</ExpensesSign>
                <StyledInput
                  type={'number'}
                  name="predicted"
                  placeholder={-predicted}
                  className={'noActive fireFoxNumber'}
                />
              </ExpensesWrapper>
            )}
            <StyledRowWrapper>
              <StyledFormButton
                green="true"
                type="submit"
                disabled={isSubmitting}
                className={
                  errors.real ||
                  values.real === '' ||
                  errors.predicted ||
                  errors.name ||
                  errors.periodClosed
                    ? 'noActive'
                    : null
                }
              >
                Zapisz
              </StyledFormButton>
              <StyledFormButton
                green="true"
                type="button"
                disabled={isSubmitting}
                onClick={() => toggleExpensesModal(null, null, null)}
              >
                Anuluj
              </StyledFormButton>
            </StyledRowWrapper>
          </StyledForm>
        </ModalWrapper>
      )}
    </Formik>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    calculateTransactions: (data, path, action) =>
      dispatch(calculateTransactionsAction(data, path, action)),
  };
};

const mapStateToProps = (
  { money, user: { hoursSettings } },
  { modalInfo: { type, id }, selectedMonthId },
) => {
  return {
    predicted:
      type &&
      (id || id === 0) &&
      money.months[selectedMonthId][type[0]][type[1]].transactions[id].predicted,
    real:
      type &&
      (id || id === 0) &&
      money.months[selectedMonthId][type[0]][type[1]].transactions[id].real,
    percentage:
      type &&
      (id || id === 0) &&
      money.months[selectedMonthId][type[0]][type[1]].transactions[id].percentage,
    name:
      type &&
      (id || id === 0) &&
      money.months[selectedMonthId][type[0]][type[1]].transactions[id].name,
    expenseType:
      type &&
      (id || id === 0) &&
      money.months[selectedMonthId][type[0]][type[1]].transactions[id].action,
    currency: hoursSettings.currency,
    isPeriodClosed: (type && money.months[selectedMonthId][type[0]].isClosed) || false,
  };
};

EditExpensesModal.propTypes = {
  predicted: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  real: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  currency: PropTypes.string,
  modalInfo: PropTypes.object,
  expensesModalContext: PropTypes.object,
  selectedMonthId: PropTypes.number,
  expenseType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  calculateTransactions: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withExpensesModal(EditExpensesModal));
