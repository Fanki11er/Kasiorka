import React from 'react';
import styled from 'styled-components';
import DataBaseIcon from '../../atoms/DataBaseIcon/DataBaseIcon';
import CheckIcon from '../../atoms/CheckIcon/CheckIcon';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  display: flex;
  height: 40px;
  color: ${({ theme }) => theme.green};
  align-self: center;
  align-items: center;
  margin: 0 5px;
`;

const StyledCheckIcon = styled(CheckIcon)`
  width: initial;
  height: 50%;
  margin-right: 3px;
`;

const StyledDataBaseIcon = styled(DataBaseIcon)`
  width: initial;
  height: 50%;
  transition: color 1s;

  &.working {
    opacity: 1;
    color: ${({ theme }) => theme.hover};
    animation-name: working;
    animation-duration: 2s;
    animation-delay: 0.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;

    @keyframes working {
      to {
        color: ${({ theme }) => theme.green};
      }
    }
  }
`;

const IsSavedInfo = ({ isAllSaved }) => {
  const { isSaved, moneyIsSaved } = isAllSaved;
  return (
    <StyledWrapper>
      <StyledCheckIcon
        className={isSaved && moneyIsSaved ? null : 'notActiveIcon'}
        title={'Stan zapisany'}
      />
      <StyledDataBaseIcon
        className={!isSaved || !moneyIsSaved ? 'working' : 'notActiveIcon'}
        title={'Trwa zapis'}
      />
    </StyledWrapper>
  );
};

IsSavedInfo.propTypes = {
  isAllSaved: PropTypes.shape({
    isSaved: PropTypes.bool,
    moneyIsSaved: PropTypes.bool,
  }),
};
export default IsSavedInfo;
