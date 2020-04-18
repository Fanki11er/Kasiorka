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
  margin: 0 15px;

  @media screen and (max-width: 1920px) {
    height: ${({ theme }) => theme.rowHeightMediumScreen};
    min-width: 180px;
  }
`;

const StyledAmount = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme }) => theme.green};
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

const StyledLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme }) => theme.menuBlue};
  margin-right: 5px;
  user-select: none;

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;

const debitTitle = 'Ustaw wartość debetu';
const interestRateTitle = 'Ustaw wartość oprocentowania';

const selectTitle = (settings) => {
  switch (settings[1]) {
    case 'debit': {
      return debitTitle;
    }
    case 'interestRate': {
      return interestRateTitle;
    }
    default: {
      return null;
    }
  }
};

const DebitCardInfo = ({
  amount,
  label,
  units,
  editable,
  expensesModalContext: { toggleDebitModal },
  settings,
}) => {
  return (
    <StyledWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledAmount>
        {amount} {units}
      </StyledAmount>
      <EndWrapper>
        {editable && (
          <StyledPencilIcon
            onClick={() => toggleDebitModal(settings, amount)}
            title={selectTitle(settings)}
          />
        )}
      </EndWrapper>
    </StyledWrapper>
  );
};

DebitCardInfo.propTypes = {
  amount: PropTypes.number,
  label: PropTypes.string,
  units: PropTypes.string,
  editable: PropTypes.bool,
  settings: PropTypes.array,
};

DebitCardInfo.defaultProps = {
  amount: 0,
  label: '----',
  units: '--',
  editable: true,
  settings: [null, null],
};

export default withExpensesModal(DebitCardInfo);
