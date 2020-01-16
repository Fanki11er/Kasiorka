import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import serverImage from '../../../assets/images/server-image.svg';
import deviceImage from '../../../assets/images/device-image.svg';
import padlockImage from '../../../assets/images/padlock-image.svg';
import syncImage from '../../../assets/images/sync-image.svg';

const StyledWrapper = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-self: center;
  align-self: center;
  justify-content: center;
  margin: 4%;
`;

const StyledServer = styled.img`
  width: 8%;
`;

const StyledDevice = styled.img`
  width: 8%;
`;

const StyledAnimationWrapper = styled.div`
  min-height: 100%;
  flex-shrink: 1;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPadlock = styled.img`
  width: 12%;
`;

const StyledSync = styled.img`
  width: 18%;
`;

const Loading = ({ innerImage }) => {
  return (
    <StyledWrapper>
      <StyledServer src={serverImage} alt="Server image" />
      <StyledAnimationWrapper>
        {innerImage === 'padlock' && <StyledPadlock src={padlockImage} alt="Padlock image" />}
        {innerImage === 'sync' && <StyledSync src={syncImage} alt="Sync image" />}
      </StyledAnimationWrapper>
      <StyledDevice src={deviceImage} alt="Device image" />
    </StyledWrapper>
  );
};

Loading.propTypes = {
  innerImage: PropTypes.oneOf(['padlock', 'sync']).isRequired,
};

export default Loading;
