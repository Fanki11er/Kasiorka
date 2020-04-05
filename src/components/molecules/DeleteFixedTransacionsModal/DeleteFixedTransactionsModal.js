import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ModalWrapper from '../../atoms/ModalWrapper/ModalWrapper';
import CoverDiv from '../../atoms/CoverDiv/CoverDiv';
import FormButton from '../../atoms/FormButton/FormButton';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';
import StyledInfo from '../../atoms/StyledInfo/StyledInfo';
import DeleteButton from '../../atoms/DeleteButton/DeleteButton';
import { deleteFixedTransactions as deleteFixedTransactionsAction } from '../../../actions/moneyActions';
import withViewContext from '../../../hoc/withViewsContext';

const StyledLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme }) => theme.menuBlue};
  margin-right: 10px;
  margin-left: 5px;
  justify-self: center;

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
    margin-right: 5px;
  }
`;

const StyledWrapper = styled(ModalWrapper)`
  flex-direction: column;
  justify-content: space-around;
  @media screen and (max-width: 1920px) {
    height: auto;
    min-height: 150px;
  }
`;

const StyledAmount = styled(StyledInfo)`
  min-width: 50px;
  width: auto;
  padding: 3px;

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;

const StyledRow = styled.div`
  display: flex;
  flex-flow: wrap row;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const DeleteFixedTransactionsModal = ({
  currency,
  transactions,
  isDeleteFixedTransactionModalOpened,
  toggleModal,
  modalInfo,
  deleteFixedTransactions,
}) => {
  const renderFixedExpenses = (fixedExpenses) => {
    return fixedExpenses.map(({ name, predicted, expenseId, created }) => (
      <StyledRow key={expenseId}>
        <StyledLabel>
          {created} {name}
        </StyledLabel>
        <StyledAmount>
          {predicted} {currency}
        </StyledAmount>
        <DeleteButton id={expenseId} modalInfo={modalInfo} deleteAction={deleteFixedTransactions} />
      </StyledRow>
    ));
  };
  return (
    <CoverDiv isModalOpened={isDeleteFixedTransactionModalOpened}>
      <StyledWrapper>
        <AccountHeader forSection={true} label={'Menu usuwania'} />
        {transactions && transactions.length > 0 && renderFixedExpenses(transactions, currency)}
        <FormButton green={'true'} onClick={() => toggleModal(null, null)}>
          OK
        </FormButton>
      </StyledWrapper>
    </CoverDiv>
  );
};

const mapStateToProps = (
  { money: { months }, user: { hoursSettings } },
  { modalInfo: { selectedMonthId, path } },
) => {
  return {
    transactions: path && months[selectedMonthId][path[0]][path[1]].transactions,
    currency: hoursSettings.currency,
    reRender:
      path && months[selectedMonthId][path[0]][path[1]].transactions
        ? months[selectedMonthId][path[0]][path[1]].transactions[0]
        : null, //Need for re-render
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFixedTransactions: (id, modalInfo) =>
      dispatch(deleteFixedTransactionsAction(id, modalInfo)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withViewContext(DeleteFixedTransactionsModal));
