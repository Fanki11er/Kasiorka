import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AccountHeaderSection from '../../molecules/AccountHeaderSection/AccountHeaderSection';
import withViewsContext from '../../../hoc/withViewsContext';
import AccountFixedExpensesSection from '../../molecules/AccountFixedExpensesSection/AccountFixedExpensesSection';

const StyledAccount = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoneyAccount = ({ viewsContext: { selectedMonthId } }) => {
  return (
    <StyledAccount>
      <AccountHeaderSection selectedMonthId={selectedMonthId} />
      <AccountFixedExpensesSection selectedMonthId={selectedMonthId} />
    </StyledAccount>
  );
};

MoneyAccount.propTypes = {
  viewsContext: PropTypes.object.isRequired,
};

export default withViewsContext(MoneyAccount);
