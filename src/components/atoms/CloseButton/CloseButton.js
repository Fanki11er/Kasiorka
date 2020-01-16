import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Close } from 'styled-icons/remix-fill';
import withSummaryContext from '../../../hoc/withSummaryContext';

const StyledIcon = styled(Close)`
  color: ${({ theme }) => theme.green};
  width: 100%;
  margin: 10px 0;

  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 10px;

  &:hover {
    border: 2px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.hover};
  }
`;

const StyledButton = styled.button`
  position: absolute;
  display: flex;
  width: 8%;
  height: auto;
  outline: none;
  top: 15px;
  right: 15px;
  background-color: transparent;
  border: none;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const CloseButton = ({ summaryContext, chosenOption }) => {
  const { toggleEditSummaryModal: toggleModal } = summaryContext;
  return (
    <StyledButton onClick={() => toggleModal(chosenOption)}>
      <StyledIcon />;
    </StyledButton>
  );
};

CloseButton.propTypes = {
  summaryContext: PropTypes.object.isRequired,
  chosenOption: PropTypes.string,
};

export default withSummaryContext(CloseButton);
