import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const StyledLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme }) => theme.menuBlue};
  min-width: 45%;
  user-select: none;

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;

const StyledStatsWrapper = styled.div`
  min-width: 45%;
  height: 20px;
  background-color: red;
  border: 1px solid ${({ theme }) => theme.menuBlue};
  border-radius: 5px;
  background-color: transparent;
`;

const StyledProgress = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.lightGreen};
  border-radius: 5px;
  animation-name: goIn;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  position: relative;

  @keyframes goIn {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
  &:after {
    position: absolute;
    content: '';
    background-color: ${({ expensesPercents, theme }) =>
      expensesPercents > 70 ? theme.sundayRed : theme.hover};
    height: 100%;
    left: 0;
    top: 0;
    width: ${({ expensesPercents }) => `${expensesPercents}%`};
    transition: background-color 1s 1s, width 2s 0.5s;
    border-radius: 5px;
    max-width: 100%;
  }
`;

const AccountStats = ({ label, expensesPercents }) => {
  return (
    <StyledWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledStatsWrapper>
        <StyledProgress expensesPercents={expensesPercents} />
      </StyledStatsWrapper>
    </StyledWrapper>
  );
};

AccountStats.propTypes = {
  label: PropTypes.string,
  expensesPercents: PropTypes.number,
};

AccountStats.defaultProps = {
  label: '----',
  expensesPercents: 0,
};

export default AccountStats;
