import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import ModalInput from '../../atoms/ModalInput/ModalInput';
import CheckBoxInput from '../../atoms/CheckBoxInput/CheckBoxInput';
import FormButton from '../../atoms/FormButton/FormButton';
import withMenuContext from '../../../hoc/withMenuContext';
import { updateUserSettings as updateUserSettingsAction } from '../../../actions/dataBaseActions';

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  min-width: 450px;
  width: 25%;
  height: 100%;
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
  justify-content: space-around;
  margin-top: 30px;
  height: 95%;
`;

const StyledButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const StyledFormButton = styled(FormButton)`
  transform: translateX(0);
  width: 150px;
  &.noActive {
    pointer-events: none;
    border: 2px solid gray;
    color: gray;
    opacity: 0.5;
  }
`;

const EditSettingsModal = ({
  currency,
  salaryValue,
  dayWorkHours,
  freeDayHours,
  workSaturdays,
  workSundays,
  workHolidays,
  menuContext,
  updateUserSettings,
}) => {
  return (
    <Formik
      initialValues={{
        currency,
        salary: salaryValue,
        dayWorkHours,
        freeDayHours,
        workSaturdays,
        workSundays,
        workHolidays,
      }}
      validate={values => {
        const errors = {};
        if (values.currency === '') errors.error = true;
        if (values.salary === '' || values.salary < 0) errors.error = true;
        if (values.dayWorkHours === '' || values.dayWorkHours < 0) errors.error = true;
        if (values.freeDayHours === '' || values.freeDayHours < 0) errors.error = true;
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const { toggleSettingsModal } = menuContext;
        const newSettings = {
          currency: values.currency,
          salaryValue: values.salary,
          dayWorkHours: values.dayWorkHours,
          freeDayHours: values.freeDayHours,
          workSaturdays: values.workSaturdays,
          workSundays: values.workSundays,
          workHolidays: values.workHolidays,
        };
        updateUserSettings(newSettings);
        toggleSettingsModal();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleSubmit, errors }) => (
        <StyledWrapper>
          <StyledForm noValidate onSubmit={handleSubmit} autoComplete="off">
            <ModalInput
              type={'text'}
              name={'currency'}
              label={'Waluta:'}
              units={''}
              val={currency}
              custom={'400px'}
            />

            <ModalInput
              type={'number'}
              name={'salary'}
              label={'Stawka godzinowa:'}
              units={`${currency}/h`}
              val={salaryValue}
              custom={'400px'}
            />

            <ModalInput
              type={'number'}
              name={'dayWorkHours'}
              label={'Godziny pracy na dobę:'}
              units={'h'}
              val={dayWorkHours}
              custom={'400px'}
            />

            <ModalInput
              type={'number'}
              name={'freeDayHours'}
              label={'Godziny na urlopie:'}
              units={'h'}
              val={freeDayHours}
              custom={'400px'}
            />

            <CheckBoxInput
              label={'Pracujące soboty:'}
              name="workSaturdays"
              type={'checkbox'}
              custom={'400px'}
              noActive
            />
            <CheckBoxInput
              label={'Pracujące niedziele:'}
              name="workSundays"
              type={'checkbox'}
              custom={'400px'}
              noActive
            />
            <CheckBoxInput
              label={'Pracujące święta:'}
              name="workHolidays"
              type={'checkbox'}
              custom={'400px'}
              noActive
            />
            <StyledButtonsWrapper>
              <StyledFormButton
                green="true"
                type="submit"
                disabled={isSubmitting}
                className={errors.error ? 'noActive' : null}
              >
                Zapisz
              </StyledFormButton>
              <StyledFormButton
                green="true"
                type="button"
                disabled={isSubmitting}
                onClick={menuContext.toggleSettingsModal}
              >
                Anuluj
              </StyledFormButton>
            </StyledButtonsWrapper>
          </StyledForm>
        </StyledWrapper>
      )}
    </Formik>
  );
};

EditSettingsModal.propTypes = {
  currency: PropTypes.string.isRequired,
  salaryValue: PropTypes.number.isRequired,
  dayWorkHours: PropTypes.number.isRequired,
  freeDayHours: PropTypes.number.isRequired,
  workSaturdays: PropTypes.bool.isRequired,
  workSundays: PropTypes.bool.isRequired,
  workHolidays: PropTypes.bool.isRequired,
  menuContext: PropTypes.object.isRequired,
  updateUserSettings: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    currency: state.user.hoursSettings.currency,
    salaryValue: state.user.hoursSettings.salaryValue,
    dayWorkHours: state.user.hoursSettings.dayWorkHours,
    freeDayHours: state.user.hoursSettings.freeDayHours,
    workSaturdays: state.user.hoursSettings.workSaturdays,
    workSundays: state.user.hoursSettings.workSundays,
    workHolidays: state.user.hoursSettings.workHolidays,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserSettings: newSettings => dispatch(updateUserSettingsAction(newSettings)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withMenuContext(EditSettingsModal));
