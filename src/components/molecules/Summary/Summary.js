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
  @media screen and (max-width: 1920px) {
    width: 370px;
  }
  @media screen and (max-width: 770px) {
    margin: 0;
    width: 98%;
    max-width: 350px;
    align-self: center;
  }
`;

class Summary extends Component {
  render() {
    const {
      totalHours,
      currency,
      paymentReceived,
      salary,
      expectedPayout,
      summaryContext: {
        optionsToChose: { optionSalary, optionPayment },
      },
    } = this.props;

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
          labelData={expectedPayout}
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

const mapStateToProps = ({ hours: { months } }, { monthId }) => {
  return {
    totalHours: months[monthId].totalHours,
    currency: months[monthId].currency,
    paymentReceived: months[monthId].payments.paymentReceived,
    salary: months[monthId].salary,
    expectedPayout: months[monthId].payments.expectedPayout,
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
