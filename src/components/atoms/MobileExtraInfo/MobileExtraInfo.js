import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StyledInfo from '../../atoms/StyledInfo/StyledInfo';

const StyledWrapper = styled.div`
  display: flex;
  justify-self: center;
  width: 300px;
  justify-content: center;
  font-weight: bold;
  margin-top: 15px;
  border-bottom: 4px solid ${({ theme }) => theme.menuBlue};
  border-radius: 15px;

  @media screen and (max-width: 1920px) {
    display: none;
  }
  @media screen and (max-width: 769px) {
    display: flex;
  }
`;

const StyledExtraInfo = styled(StyledInfo)`
  color: ${({ theme }) => theme.menuBlue};
  margin: 0 3px;
`;

const MobileExtraInfo = ({ currentMonth, currentYear }) => {
  return (
    <StyledWrapper>
      <StyledExtraInfo>{currentMonth}</StyledExtraInfo>
      <StyledExtraInfo>{currentYear}</StyledExtraInfo>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ hours: { yearName, months } }, { selectedMonthId }) => {
  return {
    currentMonth: months[selectedMonthId].name,
    currentYear: yearName,
  };
};

MobileExtraInfo.propTypes = {
  currentMonth: PropTypes.string,
  currentYear: PropTypes.number,
};

MobileExtraInfo.defaultProps = {
  currentMonth: '----',
  currentYear: '----',
};

export default connect(mapStateToProps)(MobileExtraInfo);
