import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { changeSalaryValue as changeSalaryValueAction } from '../../../actions/hoursActions';
import ModalInput from '../../atoms/ModalInput/ModalInput';
import ErrorWrapper from '../../atoms/ErrorWrapper/ErrorWrapper';
import FormButton from '../../atoms/FormButton/FormButton';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import FormError from '../../atoms/FormError/FormError';
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
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 45px;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
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

const StyledErrorWrapper = styled(ErrorWrapper)`
  padding-left: 0;
  text-align: center;
`;

const EditSalaryModal = ({
  currency,
  value,
  changeSalaryValue,
  monthId,
  summaryContext,
  chosenOption,
}) => {
  const { toggleEditSummaryModal, optionsToChose } = summaryContext;
  const { optionSalary, optionPayment } = optionsToChose;
  return (
    <Formik
      initialValues={{ [chosenOption]: '' }}
      validate={values => {
        const errors = {};

        if (!/[+]?[0-9]*\.?[0-9]+/.test(values[chosenOption]) && values[chosenOption] !== '') {
          errors[chosenOption] = 'Błędna wartość';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const newValue = parseFloat(values[chosenOption]);
        chosenOption === optionSalary && changeSalaryValue(newValue, monthId);
        toggleEditSummaryModal(chosenOption);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleSubmit, values, errors }) => (
        <StyledWrapper>
          <StyledForm noValidate onSubmit={handleSubmit}>
            {chosenOption === optionSalary && (
              <ModalInput
                label="Nowa stawka godzinowa:"
                type="text"
                name={chosenOption}
                units={`${currency}/h`}
                val={value}
              />
            )}
            {chosenOption === optionPayment && (
              <ModalInput
                label="Otrzymana wypłata:"
                type="text"
                name={chosenOption}
                units={currency}
                val={value}
              />
            )}
            <StyledErrorWrapper>
              <FormError name={chosenOption} component="div" />
            </StyledErrorWrapper>

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
  monthId: PropTypes.number.isRequired,
  summaryContext: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    changeSalaryValue: (newSalaryValue, monthId) =>
      dispatch(changeSalaryValueAction(newSalaryValue, monthId)),
  };
};

export default connect(null, mapDispatchToProps)(withSummaryContext(EditSalaryModal));
