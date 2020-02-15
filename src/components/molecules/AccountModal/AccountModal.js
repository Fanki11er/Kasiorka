import React, { Component } from 'react';
import CoverDiv from '../../atoms/CoverDiv/CoverDiv';
import EditExpensesModal from '../../molecules/EditExpensesModal/EditExpensesModal';
import withViewContext from '../../../hoc/withViewsContext';

class AccountModal extends Component {
  render() {
    const {
      isExpensesModalOpened,
      modalInfo,
      viewsContext: { selectedMonthId },
    } = this.props;
    return (
      <CoverDiv isModalOpened={isExpensesModalOpened}>
        <EditExpensesModal modalInfo={modalInfo} selectedMonthId={selectedMonthId} />
      </CoverDiv>
    );
  }
}

export default withViewContext(AccountModal);
