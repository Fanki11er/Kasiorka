import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { changeSalaryValue as changeSalaryValueAction } from '../../../actions/hoursActions';
import { changePaymentReceived as changePaymentReceivedAction } from '../../../actions/hoursActions';
import ModalInput from '../../atoms/ModalInput/ModalInput';
import FormButton from '../../atoms/FormButton/FormButton';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import ModalErrorWrapper from '../../atoms/ModalErrorWrapper/ModalErrorWrapper';
import ModalError from '../../atoms/ModalError/ModalError';
import withSummaryContext from '../../../hoc/withSummaryContext';

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

const EditSalaryModal = ({
  currency,
  value,
  changeSalaryValue,
  changePaymentReceived,
  monthId,
  summaryContext,
  chosenOption,
}) => {
  const { toggleEditSummaryModal, optionsToChose } = summaryContext;
  const { optionSalary, optionPayment } = optionsToChose;
  return (
    <Formik
      initialValues={{ [chosenOption]: '' }}
      validate={(values) => {
        const errors = {};

        if (
          (!/^[+]?[0-9]*(\.[0-9]{1,2})?$/.test(values[chosenOption]) &&
            values[chosenOption] !== '') ||
          values[chosenOption] < 0
        ) {
          errors[chosenOption] = 'Błędna wartość';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const newValue = parseFloat(values[chosenOption]);
        chosenOption === optionSalary && changeSalaryValue(newValue, monthId);
        chosenOption === optionPayment && changePaymentReceived(newValue, monthId);
        toggleEditSummaryModal(chosenOption);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleSubmit, values, errors }) => (
        <StyledWrapper>
          <StyledForm noValidate onSubmit={handleSubmit} autoComplete="off">
            {chosenOption === optionSalary && (
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
            )}
            <StyledModalErrorWrapper>
              <ModalError name={chosenOption} component="div" />
            </StyledModalErrorWrapper>

            <StyledFormButton
              className={values[chosenOption] === '' || errors[chosenOption] ? 'noActive' : null}
              green="true"
              type="submit"
              disabled={isSubmitting}
            >
              Zapisz
            </StyledFormButton>
          </StyledForm>
          <CloseButton chosenOption={chosenOption} />
        </StyledWrapper>
      )}
    </Formik>
  );
};

EditSalaryModal.propTypes = {
  currency: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  changeSalaryValue: PropTypes.func.isRequired,
  changePaymentReceived: PropTypes.func.isRequired,
  monthId: PropTypes.number.isRequired,
  summaryContext: PropTypes.object.isRequired,
  chosenOption: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeSalaryValue: (newSalaryValue, monthId) =>
      dispatch(changeSalaryValueAction(newSalaryValue, monthId)),
    changePaymentReceived: (newPaymentValue, monthId) =>
      dispatch(changePaymentReceivedAction(newPaymentValue, monthId)),
  };
};

export default connect(null, mapDispatchToProps)(withSummaryContext(EditSalaryModal));
