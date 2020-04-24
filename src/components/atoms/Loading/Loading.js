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

  @media screen and (max-width: 770px) {
    height: 100%;
  }
`;

const StyledServer = styled.img`
  width: 8%;

  @media screen and (max-width: 770px) {
    width: 15%;
  }
`;

const StyledDevice = styled.img`
  width: 8%;

  @media screen and (max-width: 770px) {
    width: 15%;
  }
`;

const StyledAnimationWrapper = styled.div`
  min-height: 100%;
  flex-shrink: 1;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 770px) {
    width: 35%;
  }
`;

const StyledPadlock = styled.img`
  width: 12%;
  animation-name: rotationY;
  animation-duration: 7s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;

  @media screen and (max-width: 770px) {
    width: 20%;
  }
  @keyframes rotationY {
    to {
      transform: rotateY(1080deg);
    }
  }
`;

const StyledSync = styled.img`
  width: 18%;
  animation-name: rotation;
  animation-duration: 7s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  @media screen and (max-width: 770px) {
    width: 28%;
  }
  @keyframes rotation {
    to {
      transform: rotate(-1080deg);
    }
  }
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
