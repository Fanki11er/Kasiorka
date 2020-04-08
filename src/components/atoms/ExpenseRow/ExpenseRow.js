import React from 'react';
import styled from 'styled-components';
import withExpensesModal from '../../../hoc/withExpensesModal';
import PropTypes from 'prop-types';
import PencilIcon from '../../atoms/PencilIcon/PencilIcon';
import WalletIcon from '../../atoms/WalletIcon/WalletIcon';
import CardIcon from '../../atoms/CardIcon/CardIcon';
import PiggyIcon from '../../atoms/PiggyIcon/PiggyIcon';
import { accountActions } from '../../../tools/moneyTools';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.rowHeight};
  min-width: 250px;
  justify-content: space-between;

  @media screen and (max-width: 1920px) {
    height: ${({ theme }) => theme.rowHeightMediumScreen};
    min-width: 180px;
  }
`;

const StyledNumbers = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme, action }) => (action === '+' ? theme.green : theme.sundayRed)};
  margin-right: 12px;
  user-select: none;

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;

const StyledPencilIcon = styled(PencilIcon)`
  position: initial;
`;

const EndWrapper = styled.div`
  display: flex;
  justify-self: flex-end;
  height: 100%;
  align-items: center;
  width: 100px;
  justify-content: space-between;

  @media screen and (max-width: 1920px) {
    width: 70px;
  }
`;

const StyledPercentage = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme }) => theme.green};
  margin-right: 5px;
  user-select: none;

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;

const ExpenseRow = ({
  text,
  percentage,
  expensesModalContext: { toggleExpensesModal },
  id,
  type,
  action,
  signature,
}) => {
  const { edit, chargeWalletAccount, payTheCard, chargeSavingAccount } = accountActions;

  return (
    <StyledWrapper>
      <StyledNumbers action={action}>{text}</StyledNumbers>
      <EndWrapper>
        {percentage !== undefined && <StyledPercentage>{percentage}%</StyledPercentage>}
        {signature === 'standard' && (
          <StyledPencilIcon onClick={() => toggleExpensesModal(id, type, edit)} />
        )}
        {signature === 'wallet' && (
          <WalletIcon onClick={() => toggleExpensesModal(id, type, chargeWalletAccount)} />
        )}
        {signature === 'debit' && (
          <CardIcon onClick={() => toggleExpensesModal(id, type, payTheCard)} />
        )}

        {signature === 'saving' && (
          <PiggyIcon onClick={() => toggleExpensesModal(id, type, chargeSavingAccount)} />
        )}
      </EndWrapper>
    </StyledWrapper>
  );
};

ExpenseRow.propTypes = {
  text: PropTypes.string,
  percentage: PropTypes.number,
  id: PropTypes.number.isRequired,
  type: PropTypes.array.isRequired,
  signature: PropTypes.string,
  action: PropTypes.string,
  expensesModalContext: PropTypes.object,
};

export default withExpensesModal(ExpenseRow);
