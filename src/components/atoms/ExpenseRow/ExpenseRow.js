import React from 'react';
import styled from 'styled-components';
import withExpensesModal from '../../../hoc/withExpensesModal';
import PropTypes from 'prop-types';
import PencilIcon from '../../atoms/PencilIcon/PencilIcon';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.rowHeight};
  min-width: 250px;
  justify-content: space-between;
`;

const StyledNumbers = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme }) => theme.green};
  margin-right: 12px;
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
`;

const StyledPercentage = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme }) => theme.green};
  margin-right: 5px;
`;

const ExpenseRow = ({ text, percentage, expensesModalContext: { toggleExpensesModal } }) => {
  return (
    <StyledWrapper>
      <StyledNumbers>{text}</StyledNumbers>
      <EndWrapper>
        {percentage !== undefined && <StyledPercentage>{percentage}%</StyledPercentage>}
        <StyledPencilIcon onClick={toggleExpensesModal} />
      </EndWrapper>
    </StyledWrapper>
  );
};

ExpenseRow.propTypes = {
  text: PropTypes.string,
  percentage: PropTypes.number,
};

export default withExpensesModal(ExpenseRow);
