import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountStyledSection from '../../atoms/AccountStyledSection/AccountStyledSection';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';

const StyledMainSection = styled.section`
  display: flex;
  flex-direction: column;
  align-content: space-around;
`;

const OtherAccountsSection = ({ accountLabel, currency, type, otherAccounts, renderExpenses }) => {
  return (
    <AccountStyledSection>
      <AccountHeader label={accountLabel} forSection={true} />

      <StyledMainSection>
        {otherAccounts.length > 0 && renderExpenses(otherAccounts, currency, type)}
      </StyledMainSection>
    </AccountStyledSection>
  );
};

const mapStateToProps = (
  { money: { months }, user: { hoursSettings } },
  { selectedMonthId, path },
) => {
  return {
    accountLabel: months[selectedMonthId][path[0]][path[1]].name,
    otherAccounts: months[selectedMonthId][path[0]][path[1]].transactions,
    currency: hoursSettings.currency,
    type: months[selectedMonthId][path[0]][path[1]].path,
  };
};

OtherAccountsSection.propTypes = {
  accountLabel: PropTypes.string,
  currency: PropTypes.string,
  otherAccounts: PropTypes.array,
  type: PropTypes.array,
  renderExpenses: PropTypes.func,
};

OtherAccountsSection.defaultProps = {
  accountLabel: 'Konta',
  otherAccounts: [],
};

export default connect(mapStateToProps)(OtherAccountsSection);
