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
import { validateHoursInModal } from '../../../tools/hoursTools';

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
  @media screen and (max-width: 1920px) {
    min-width: 345px;
  }
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
  saturdayWorkHours,
  workSaturdays,
  workSundays,
  workHolidays,
  menuContext,
  updateUserSettings,
  sundayWorkHours,
  holidayWorkHours,
}) => {
  return (
    <Formik
      initialValues={{
        currency,
        salary: salaryValue,
        dayWorkHours,
        freeDayHours,
        saturdayWorkHours,
        workSaturdays,
        workSundays,
        workHolidays,
        sundayWorkHours,
        holidayWorkHours,
      }}
      validate={(values) => {
        const errors = {};
        if (values.currency === '' || values.currency.match(/[0-9-+]/)) {
          errors.currency = true;
          errors.error = true;
        }

        if (
          !/^[+]?[0-9]*(\.[0-9]{1,2})?$/.test(values.salary) ||
          values.salary > 999999 ||
          values.salary === ''
        ) {
          errors.salary = true;
          errors.error = true;
        }
        validateHoursInModal(values, 'dayWorkHours', errors);
        validateHoursInModal(values, 'freeDayHours', errors);
        validateHoursInModal(values, 'saturdayWorkHours', errors);
        validateHoursInModal(values, 'sundayWorkHours', errors);
        validateHoursInModal(values, 'holidayWorkHours', errors);

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
          saturdayWorkHours: values.workSaturdays ? values.saturdayWorkHours : 0,
          sundayWorkHours: values.workSundays ? values.sundayWorkHours : 0,
          holidayWorkHours: values.workHolidays ? values.holidayWorkHours : 0,
        };
        updateUserSettings(newSettings);
        toggleSettingsModal();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleSubmit, errors, values }) => (
        <StyledWrapper>
          <StyledForm noValidate onSubmit={handleSubmit} autoComplete="off">
            <ModalInput
              type={'text'}
              name={'currency'}
              label={'Waluta:'}
              units={''}
              val={currency}
              custom
              length={3}
              error={errors.currency ? true : false}
            />

            <ModalInput
              type={'number'}
              name={'salary'}
              label={'Stawka godzinowa:'}
              units={`${currency}/h`}
              val={salaryValue}
              error={errors.salary ? true : false}
              custom
            />

            <ModalInput
              type={'number'}
              name={'dayWorkHours'}
              label={'Godziny pracy na dobę:'}
              units={'h'}
              val={dayWorkHours}
              error={errors.dayWorkHours ? true : false}
              custom
            />

            <ModalInput
              type={'number'}
              name={'freeDayHours'}
              label={'Godziny na urlopie:'}
              units={'h'}
              val={freeDayHours}
              error={errors.freeDayHours ? true : false}
              custom
            />

            <CheckBoxInput
              label={'Pracujące soboty:'}
              name="workSaturdays"
              type={'checkbox'}
              custom
            />
            {values.workSaturdays && (
              <ModalInput
                type={'number'}
                name={'saturdayWorkHours'}
                label={'Godziny w soboty:'}
                units={'h'}
                val={saturdayWorkHours}
                error={errors.saturdayWorkHours ? true : false}
                custom
              />
            )}
            <CheckBoxInput
              label={'Pracujące niedziele:'}
              name="workSundays"
              type={'checkbox'}
              custom
            />
            {values.workSundays && (
              <ModalInput
                type={'number'}
                name={'sundayWorkHours'}
                label={'Godziny w niedziele:'}
                units={'h'}
                val={sundayWorkHours}
                error={errors.sundayWorkHours ? true : false}
                custom
              />
            )}
            <CheckBoxInput
              label={'Pracujące święta:'}
              name="workHolidays"
              type={'checkbox'}
              custom
            />

            {values.workHolidays && (
              <ModalInput
                type={'number'}
                name={'holidayWorkHours'}
                label={'Godziny w święta:'}
                units={'h'}
                val={holidayWorkHours}
                error={errors.holidayWorkHours ? true : false}
                custom
              />
            )}
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
                onClick={() => {
                  menuContext.toggleSettingsModal();
                }}
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
  dayWorkHours: PropTypes.number,
  freeDayHours: PropTypes.number,
  saturdayWorkHours: PropTypes.number,
  workSaturdays: PropTypes.bool.isRequired,
  workSundays: PropTypes.bool.isRequired,
  workHolidays: PropTypes.bool.isRequired,
  menuContext: PropTypes.object.isRequired,
  updateUserSettings: PropTypes.func.isRequired,
  sundayWorkHours: PropTypes.number,
  holidayWorkHours: PropTypes.number,
};

EditSettingsModal.defaultProps = {
  saturdayWorkHours: 0,
  dayWorkHours: 0,
  freeDayHours: 0,
  sundayWorkHours: 0,
  holidayWorkHours: 0,
};

const mapStateToProps = ({ user: { hoursSettings } }) => {
  return {
    currency: hoursSettings.currency,
    salaryValue: hoursSettings.salaryValue,
    dayWorkHours: hoursSettings.dayWorkHours,
    freeDayHours: hoursSettings.freeDayHours,
    workSaturdays: hoursSettings.workSaturdays,
    workSundays: hoursSettings.workSundays,
    workHolidays: hoursSettings.workHolidays,
    saturdayWorkHours: hoursSettings.saturdayWorkHours || 0,
    sundayWorkHours: hoursSettings.sundayWorkHours || 0,
    holidayWorkHours: hoursSettings.holidayWorkHours || 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserSettings: (newSettings) => dispatch(updateUserSettingsAction(newSettings)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withMenuContext(EditSettingsModal));
