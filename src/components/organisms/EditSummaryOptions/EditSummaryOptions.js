import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditSalaryModal from '../../molecules/EditSalaryModal/EditSalaryModal';
import withSummaryContext from '../../../hoc/withSummaryContext';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ isSummaryModalOpened }) =>
    isSummaryModalOpened === true ? 'translateY(0)' : 'translateY(105%)'};
  transition: transform 0.6s ease-in;
`;

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
      <StyledWrapper isSummaryModalOpened={isSummaryModalOpened}>
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
      </StyledWrapper>
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
};

EditSummaryOptions.defaultProps = {
  currency: 'zł',
  salary: 0,
  isSummaryModalOpened: false,
  monthId: 0,
  paymentReceived: 0,
};

export default connect(mapStateToProps)(withSummaryContext(EditSummaryOptions));
