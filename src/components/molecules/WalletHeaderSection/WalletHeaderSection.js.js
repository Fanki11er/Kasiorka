import React from 'react';
import styled from 'styled-components';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountStyledSection from '../../atoms/AccountStyledSection/AccountStyledSection';
import AccountStatus from '../../atoms/AccountStatus/AccountStatus';
import WalletIcon from '../../atoms/WalletIcon/WalletIcon';

const StyledHeaderWithIcon = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled(WalletIcon)`
  margin: 0 10px 0 0;
  user-select: none;
  pointer-events: none;
`;

const WalletHeaderSection = ({ accountLabel, currency, computedStatus }) => {
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
    accountLabel: months[selectedMonthId].wallet.title,
    currency: hoursSettings.currency,
    computedStatus: months[selectedMonthId].computedData[path[0]],
    selectedMonth: months[selectedMonthId],
  };
};

WalletHeaderSection.propTypes = {
  accountLabel: PropTypes.string,
  currency: PropTypes.string,
  computedStatus: PropTypes.object,
};

WalletHeaderSection.defaultProps = {
  accountLabel: 'None',
  currency: 'zł',
};

export default connect(mapStateToProps)(WalletHeaderSection);
