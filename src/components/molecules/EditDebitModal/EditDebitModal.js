import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import ModalInput from '../../atoms/ModalInput/ModalInput';
import FormButton from '../../atoms/FormButton/FormButton';
import ModalErrorWrapper from '../../atoms/ModalErrorWrapper/ModalErrorWrapper';
import ModalError from '../../atoms/ModalError/ModalError';
import withExpensesModal from '../../../hoc/withExpensesModal';
import { setNewDebitSettings as setNewDebitSettingsAction } from '../../../actions/moneyActions';

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  min-width: 600px;
  width: 40%;
  height: 350px;
  border: 3px solid ${({ theme }) => theme.menuBlue};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.primaryTransparent};
  align-items: center;
  @media screen and (max-width: 1920px) {
    min-width: 300px;
    height: 230px;
    width: 55%;
    max-width: 500px;
  }
  @media screen and (max-width: 767px) {
    min-width: 340px;
    max-width: 450px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 45px;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  @media screen and (max-width: 1920px) {
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
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

const StyledModalErrorWrapper = styled(ModalErrorWrapper)`
  height: 15px;
  margin: 5px 0;
  text-align: center;
`;

const StyledRowWrapper = styled.div`
  width: 85%;
  display: flex;
  justify-self: center;
  justify-content: space-around;
`;

const EditDebitModal = ({
  currency,
  modalInfo,
  expensesModalContext: { toggleDebitModal, isDebitModalOpened },
  selectedMonthId,
  setNewDebitSettings,
}) => {
  const { account, property, amount } = modalInfo;
  return (
    <Formik
      initialValues={{
        selectedValue: '',
      }}
      validate={(values) => {
        const errors = {};

        if (
          (!/^[+]?[0-9]*(\.[0-9]{1,2})?$/.test(values.selectedValue) &&
            values.selectedValue !== '') ||
          values.selectedValue < 0
        ) {
          errors.selectedValue = 'Błędna wartość';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const newValue = parseFloat(values.selectedValue);
        const data = {
          newValue,
          selectedMonthId,
          account,
          property,
        };
        setNewDebitSettings(data);
        toggleDebitModal([null, null], null);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleSubmit, values, errors, resetForm }) => (
        <StyledWrapper>
          <StyledForm noValidate onSubmit={handleSubmit} autoComplete="off">
            {property === 'debit' && (
              <ModalInput
                label="Zmień debet:"
                type="number"
                name="selectedValue"
                units={currency}
                val={amount}
                error={errors.selectedValue ? true : false}
                modalOpened={isDebitModalOpened}
              />
            )}
            {property === 'interestRate' && (
              <ModalInput
                label="Zmień oprocentowanie:"
                type="number"
                name="selectedValue"
                val={amount}
                units={'%'}
                error={errors.selectedValue ? true : false}
              />
            )}
            <StyledModalErrorWrapper>
              <ModalError name="selectedValue" component="div" />
            </StyledModalErrorWrapper>
            <StyledRowWrapper>
              <StyledFormButton
                className={
                  (!values.selectedValue && values.selectedValue !== 0) || errors.selectedValue
                    ? 'noActive'
                    : null
                }
                green="true"
                type="submit"
                disabled={isSubmitting}
              >
                Zapisz
              </StyledFormButton>
              <StyledFormButton
                green="true"
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  resetForm();
                  toggleDebitModal([null, null], null);
                }}
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

EditDebitModal.propTypes = {
  currency: PropTypes.string,
  selectedMonthId: PropTypes.number.isRequired,
  expensesModalContext: PropTypes.object,
};

EditDebitModal.defaultProps = {
  currency: '----',
};

const mapStateToProps = ({ user: { hoursSettings } }) => {
  return {
    currency: hoursSettings.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewDebitSettings: (data) => dispatch(setNewDebitSettingsAction(data)),
    /*
    changeSalaryValue: (newSalaryValue, monthId) =>
      dispatch(changeSalaryValueAction(newSalaryValue, monthId)),
    changePaymentReceived: (newPaymentValue, monthId) =>
      dispatch(changePaymentReceivedAction(newPaymentValue, monthId)),*/
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withExpensesModal(EditDebitModal));
