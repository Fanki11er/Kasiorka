import React from 'react';
import styled from 'styled-components';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountStyledSection from '../../atoms/AccountStyledSection/AccountStyledSection';
import AccountStatus from '../../atoms/AccountStatus/AccountStatus';
import PiggyIcon from '../../atoms/PiggyIcon/PiggyIcon';

const StyledHeaderWithIcon = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled(PiggyIcon)`
  margin: 0 10px 0 0;
  user-select: none;
  pointer-events: none;
`;

const SavingAccountHeaderSection = ({ accountLabel, currency, computedStatus }) => {
  return (
    <AccountStyledSection>
      <StyledHeaderWithIcon>
        <StyledIcon />
        <AccountHeader label={accountLabel} />
      </StyledHeaderWithIcon>
      <AccountStatus units={currency} status={computedStatus} />
    </AccountStyledSection>
  );
};
const mapStateToProps = (
  { money: { months }, user: { hoursSettings } },
  { selectedMonthId, path },
) => {
  return {
    accountLabel: months[selectedMonthId].savingAccount.title,
    currency: hoursSettings.currency,
    computedStatus: months[selectedMonthId].computedData[path[0]],
    selectedMonth: months[selectedMonthId],
  };
};

SavingAccountHeaderSection.propTypes = {
  accountLabel: PropTypes.string,
  currency: PropTypes.string,
  computedStatus: PropTypes.object,
};

SavingAccountHeaderSection.defaultProps = {
  accountLabel: 'None',
  currency: 'zł',
};

export default connect(mapStateToProps)(SavingAccountHeaderSection);
