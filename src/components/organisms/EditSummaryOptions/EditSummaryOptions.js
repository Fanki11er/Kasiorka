import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditSalaryModal from '../../molecules/EditSalaryModal/EditSalaryModal';

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
  transform: ${({ modalToggle }) => (modalToggle === true ? 'translateY(0)' : 'translateY(105%)')};
  transition: transform 0.6s ease-in;
`;

class EditSummaryOptions extends Component {
  render() {
    const { modalToggle, currency, salary, monthId } = this.props;

    return (
      <StyledWrapper modalToggle={modalToggle}>
        <EditSalaryModal currency={currency} salary={salary} monthId={monthId} />
      </StyledWrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { monthId } = ownProps;

  return {
    currency: state.hours.months[monthId].currency,
    salary: state.hours.months[monthId].salary,
  };
};

EditSummaryOptions.propTypes = {
  currency: PropTypes.string,
  salary: PropTypes.number,
  modalToggle: PropTypes.bool,
  monthId: PropTypes.number,
};

EditSummaryOptions.defaultProps = {
  currency: 'zł',
  salary: 0,
  modalToggle: false,
  monthId: 0,
};

export default connect(mapStateToProps)(EditSummaryOptions);
