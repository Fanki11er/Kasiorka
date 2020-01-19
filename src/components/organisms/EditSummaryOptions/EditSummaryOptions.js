import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditSalaryModal from '../../molecules/EditSalaryModal/EditSalaryModal';
import CoverDiv from '../../atoms/CoverDiv/CoverDiv';
import withSummaryContext from '../../../hoc/withSummaryContext';

class EditSummaryOptions extends Component {
  render() {
    const {
      isSummaryModalOpened,
      currency,
      salary,
      monthId,
      chosenOption,
      summaryContext,
      paymentReceived,
    } = this.props;
    const { optionsToChose } = summaryContext;
    const { optionPayment, optionSalary } = optionsToChose;
    return (
      <CoverDiv isModalOpened={isSummaryModalOpened}>
        {chosenOption === optionSalary && (
          <EditSalaryModal
            chosenOption={chosenOption}
            currency={currency}
            value={salary}
            monthId={monthId}
          />
        )}
        {chosenOption === optionPayment && (
          <EditSalaryModal
            chosenOption={chosenOption}
            currency={currency}
            value={paymentReceived}
            monthId={monthId}
          />
        )}
      </CoverDiv>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { monthId } = ownProps;

  return {
    currency: state.hours.months[monthId].currency,
    salary: state.hours.months[monthId].salary,
    paymentReceived: state.hours.months[monthId].paymentReceived,
  };
};

EditSummaryOptions.propTypes = {
  currency: PropTypes.string,
  salary: PropTypes.number,
  isSummaryModalOpened: PropTypes.bool,
  monthId: PropTypes.number,
  paymentReceived: PropTypes.number,
  summaryContext: PropTypes.object.isRequired,
  chosenOption: PropTypes.string,
};

EditSummaryOptions.defaultProps = {
  currency: 'zł',
  salary: 0,
  isSummaryModalOpened: false,
  monthId: 0,
  paymentReceived: 0,
};

export default connect(mapStateToProps)(withSummaryContext(EditSummaryOptions));
