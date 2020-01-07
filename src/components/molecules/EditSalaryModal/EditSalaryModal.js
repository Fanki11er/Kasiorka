import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import ModalInput from '../../atoms/ModalInput/ModalInput';
import ErrorWrapper from '../../atoms/ErrorWrapper/ErrorWrapper';
import FormButton from '../../atoms/FormButton/FormButton';

const StyledWrapper = styled.div`
  min-width: 600px;
  width: 40%;
  height: 300px;
  border: 3px solid ${({ theme }) => theme.menuBlue};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.primaryTransparent};
  display: flex;
  flex-direction: column;
  padding-top: 45px;
  align-items: center;
  justify-content: center;
`;

const StyledFormButton = styled(FormButton)`
  transform: translateX(0);
`;

const EditSalaryModal = () => {
  return (
    <Formik
      initialValues={{ salary: '' }}
      onSubmit={(values, { setSubmitting }) => {
        //signIn(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <StyledWrapper>
          <ModalInput
            label="Nowa stawka godzinowa"
            type="text"
            name="salary"
            units="zł/h"
            val="15"
          />
          <ErrorWrapper />
          <StyledFormButton green="true">Zapisz</StyledFormButton>
        </StyledWrapper>
      )}
    </Formik>
  );
};

export default EditSalaryModal;
