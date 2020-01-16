import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfoDiv from '../../atoms/InfoDiv/InfoDiv';
import withSummaryContext from '../../../hoc/withSummaryContext';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  width: 525px;
  margin: 0 auto;
`;

class Summary extends Component {
  render() {
    const { totalHours, currency, paymentReceived, salary, summaryContext } = this.props;
    const { optionsToChose } = summaryContext;
    const { optionSalary, optionPayment } = optionsToChose;
    const expectedPayout = (totalHours, salary) => {
      return parseFloat((totalHours * salary).toFixed(2));
    };

    return (
      <StyledWrapper>
        <InfoDiv labelText="Suma godzin" labelData={totalHours} units={'h'}></InfoDiv>
        <InfoDiv
          chosenOption={optionSalary}
          editable
          labelText="Stawka godzinowa"
          labelData={salary}
          units={`${currency}/h`}
        ></InfoDiv>
        <InfoDiv
          labelText="Przewidywana wypłata"
          labelData={expectedPayout(totalHours, salary)}
          units={currency}
        ></InfoDiv>
        <InfoDiv
          editable
          chosenOption={optionPayment}
          labelText="Otrzymana wypłata"
          labelData={paymentReceived}
          units={currency}
        ></InfoDiv>
      </StyledWrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { monthId } = ownProps;
  return {
    totalHours: state.hours.months[monthId].totalHours,
    currency: state.hours.months[monthId].currency,
    paymentReceived: state.hours.months[monthId].paymentReceived,
    salary: state.hours.months[monthId].salary,
  };
};

Summary.propTypes = {
  monthId: PropTypes.number,
  totalHours: PropTypes.number,
  currency: PropTypes.string,
  paymentReceived: PropTypes.number,
  salary: PropTypes.number,
  summaryContext: PropTypes.object.isRequired,
};

Summary.defaultProps = {
  monthId: 0,
  totalHours: 0,
  currency: 'zł',
  paymentReceived: 0,
  salary: 0,
};
export default connect(mapStateToProps)(withSummaryContext(Summary));
