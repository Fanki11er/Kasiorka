import React from 'react';
import CoverDiv from '../../atoms/CoverDiv/CoverDiv';
import PropTypes from 'prop-types';
import EditDebitModal from '../EditDebitModal/EditDebitModal';
import withViewContext from '../../../hoc/withViewsContext';

const DebitModal = ({ viewsContext: { selectedMonthId }, isDebitModalOpened, modalInfo }) => {
  return (
    <CoverDiv isModalOpened={isDebitModalOpened}>
      <EditDebitModal selectedMonthId={selectedMonthId} modalInfo={modalInfo} />
    </CoverDiv>
  );
};

DebitModal.propTypes = {
  viewsContext: PropTypes.object,
  isDebitModalOpened: PropTypes.bool,
  modalInfo: PropTypes.object,
};

DebitModal.defaultProps = {
  isDebitModalOpened: false,
};

export default withViewContext(DebitModal);
