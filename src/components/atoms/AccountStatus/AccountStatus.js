import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ExpensesSign from '../ExpensesSign/ExpensesSign';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 15px;
  flex-flow: wrap row;
  margin: 5px 0;
  justify-content: space-around;

  @media screen and (max-width: 1920px) {
    min-height: 25px;
  }
`;

const StyledLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme }) => theme.menuBlue};
  margin-right: 10px;
  min-width: 20%;
  display: flex;

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;
const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  min-width: 30%;
  height: 100%;
  color: ${({ theme, minus }) => (minus ? theme.sundayRed : theme.green)};
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  padding: 0 10px;
  justify-content: center;

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;

const StyledFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 60%;
  flex-grow: 1;
  justify-content: center;
`;

const AccountStatus = ({ status, units }) => {
  const { monthTotal, monthTotalPredicted } = status;
  return (
    <StyledWrapper>
      <StyledLabel>Stan konta:</StyledLabel>
      <StyledFlexWrapper>
        <StyledInfo minus={monthTotal < 0 ? true : false}> {`${monthTotal} ${units}`} </StyledInfo>
        <ExpensesSign>/</ExpensesSign>
        <StyledInfo minus={monthTotalPredicted < 0 ? true : false}>
          {`${monthTotalPredicted} ${units}`}
        </StyledInfo>
      </StyledFlexWrapper>
    </StyledWrapper>
  );
};

AccountStatus.propTypes = {
  status: PropTypes.object.isRequired,
  units: PropTypes.string,
};

AccountStatus.defaultProps = {
  units: 'zł',
};

export default AccountStatus;
