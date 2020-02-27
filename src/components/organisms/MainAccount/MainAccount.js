import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import withViewsContext from '../../../hoc/withViewsContext';
import AccountFixedExpensesSection from '../../molecules/AccountFixedExpensesSection/AccountFixedExpensesSection';
import AccountHeaderSection from '../../molecules/AccountHeaderSection/AccountHeaderSection';
import TransactionsSection from '../../molecules/TransactionsSection/TransactionsSection';
import withExpensesModal from '../../../hoc/withExpensesModal';
import MoneyRow from '../../atoms/MoneyRow/MoneyRow';

const StyledAccount = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainAccount = ({
  viewsContext: { selectedMonthId },
  expensesModalContext: { toggleExpensesModal },
}) => {
  const renderExpenses = (expenses, currency, type) => {
    return expenses.map(({ name, percentage, predicted, real, action }, index) => (
      <MoneyRow
        label={name}
        content={{ percentage, predicted, real, action }}
        units={currency}
        key={index}
        type={type}
        id={index}
      />
    ));
  };

  return (
    <StyledAccount>
      <AccountHeaderSection selectedMonthId={selectedMonthId} path={['mainAccount', null]} />
      <TransactionsSection
        renderExpenses={renderExpenses}
        toggleExpensesModal={toggleExpensesModal}
        selectedMonthId={selectedMonthId}
        path={['mainAccount', 'transactions']}
      />
    </StyledAccount>
  );
};

MainAccount.propTypes = {
  viewsContext: PropTypes.object.isRequired,
};

export default compose(withViewsContext, withExpensesModal)(MainAccount);
