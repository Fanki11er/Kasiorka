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
import { editExpense as editExpenseAction } from '../../../actions/moneyActions';
import { addExpense as addExpenseAction } from '../../../actions/moneyActions';
import ModalInput from '../../atoms/ModalInput/ModalInput';

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  min-width: 500px;
  width: 28%;
  height: 475px;
  border: 3px solid ${({ theme }) => theme.menuBlue};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.primaryTransparent};
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1920px) {
    min-width: 450px;
    height: 300px;
    width: 35%;
    max-width: 500px;
  }
  @media screen and (max-width: 767px) {
    min-width: 340px;
    max-width: 450px;
  }
`;
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
  editExpense,
  selectedMonthId,
  expenseType,
  addExpense,
}) => {
  return (
    <Formik
      initialValues={{
        action: '-',
        real: '',
        predicted: '',
        name: 'Zakupy',
      }}
      validate={values => {
        const errors = {};

        if (!/[+]?[0-9]*\.?[0-9]+/.test(values.real) || values.real < 0 || values.real === 'e') {
          errors.real = true;
        }
        if (values.predicted === 'e' || values.predicted < 0) {
          errors.predicted = true;
        }

        if (values.name === '' && action === 'add') {
          errors.name = true;
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const data = {
          real: values.real,
          predicted: values.predicted,
          action: values.action,
          name: values.name || 'none',
        };

        const path = {
          type,
          id,
          selectedMonthId,
        };
        action === 'edit' && editExpense(data, path);
        action === 'add' && addExpense(data, path);

        toggleExpensesModal(null, null, null);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleSubmit, values, errors }) => (
        <StyledWrapper>
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

            {action === 'add' && <ModalInput label="Opis:" type="text" name="name" />}
            {action === 'add' && (
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
            <ExpensesWrapper>
              <ExpensesSign>{action === 'edit' ? expenseType : values.action}</ExpensesSign>
              <StyledInput type={'Number'} name="real" placeholder={'Rzeczywista'} />
              <ExpensesSign>/</ExpensesSign>
              <StyledInput type={'Number'} name="predicted" placeholder={'Przewidywana'} />
            </ExpensesWrapper>
            <StyledRowWrapper>
              <StyledFormButton
                green="true"
                type="submit"
                disabled={isSubmitting}
                className={
                  errors.real || values.real === '' || errors.predicted || errors.name
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
        </StyledWrapper>
      )}
    </Formik>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    editExpense: (data, path) => dispatch(editExpenseAction(data, path)),
    addExpense: (data, path) => dispatch(addExpenseAction(data, path)),
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
      money.months[selectedMonthId][type[0]][type[1]].expenses[id].predicted,
    real:
      type && (id || id === 0) && money.months[selectedMonthId][type[0]][type[1]].expenses[id].real,
    percentage:
      type &&
      (id || id === 0) &&
      money.months[selectedMonthId][type[0]][type[1]].expenses[id].percentage,
    name:
      type && (id || id === 0) && money.months[selectedMonthId][type[0]][type[1]].expenses[id].name,
    expenseType:
      type &&
      (id || id === 0) &&
      money.months[selectedMonthId][type[0]][type[1]].expenses[id].action,
    currency: hoursSettings.currency,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withExpensesModal(EditExpensesModal));

/*            <StyledErrorWrapper>
              <FormError name={chosenOption} component="div" />
            </StyledErrorWrapper>

            <StyledFormButton
              className={values[chosenOption] === '' || errors[chosenOption] ? 'noActive' : null}
              green="true"
              type="submit"
              disabled={isSubmitting}
            >
              Zapisz
            </StyledFormButton> */

/*{chosenOption === optionSalary && (
              <ModalInput
                label="Nowa stawka godzinowa:"
                type="number"
                name={chosenOption}
                units={`${currency}/h`}
                val={value}
              />
            )}
            {chosenOption === optionPayment && (
              <ModalInput
                label="Otrzymana wypłata:"
                type="number"
                name={chosenOption}
                units={currency}
                val={value}
              />
            )} */
