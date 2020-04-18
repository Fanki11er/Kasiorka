import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ErrorCircle } from 'styled-icons/boxicons-regular/';

const StyledModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 50px;
  right: 0;
  background-color: ${({ theme }) => theme.primaryTransparent};
  border: 2px solid ${({ theme }) => theme.sundayRed};
  border-radius: 10px;
  max-width: 250px;
  transform: ${({ errorsOccurred }) =>
    errorsOccurred === true ? 'translateX(0)' : 'translateX(260px)'};
  transition: transform 0.7s;
  padding: 2px 5px;
  cursor: pointer;
`;

const StyledErrorIcon = styled(ErrorCircle)`
  color: ${({ theme }) => theme.hover};
  min-width: 30px;
  min-height: 30px;
`;

const StyledErrorRow = styled.div`
  display: flex;
  align-items: center;
  margin: 2px 0;
`;

const StyledErrorText = styled.div`
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSizeMedium.verySmall};
  font-weight: bold;
  margin-left: 6px;
`;

const StyledErrName = styled.span`
  color: ${({ theme }) => theme.sundayRed};
`;

const ErrorsInfoModal = ({ errors, errorsOccurred, closeModal }) => {
  return (
    <StyledModalWrapper
      errorsOccurred={errorsOccurred}
      onClick={closeModal}
      title={'Zamknij modal'}
    >
      {renderErrors(errors)}
    </StyledModalWrapper>
  );
};

ErrorsInfoModal.propTypes = {
  errors: PropTypes.object.isRequired,
  errorsOccurred: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
};

ErrorsInfoModal.defaultProps = {
  errorsOccurred: false,
};

export default ErrorsInfoModal;

const renderErrors = (errors) => {
  const errorsArr = Object.entries(errors);
  const activeErrors = errorsArr.filter(([, value]) => {
    return value ? true : false;
  });
  return activeErrors.map(([errName, errValue], index) => (
    <StyledErrorRow key={index}>
      <StyledErrorIcon />
      <StyledErrorText>
        <StyledErrName>{`${errName}: `}</StyledErrName>
        {errValue}
      </StyledErrorText>
    </StyledErrorRow>
  ));
};
