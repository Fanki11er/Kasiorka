import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TitleHeader from '../../atoms/TitleHeader/TitleHeader';
import Loading from '../../atoms/Loading/Loading';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8%;
`;

const WaitingScreen = ({ innerImage }) => {
  return (
    <StyledWrapper>
      <TitleHeader small />
      <Loading innerImage={innerImage} />
    </StyledWrapper>
  );
};

WaitingScreen.propTypes = {
  innerImage: PropTypes.string.isRequired,
};

export default WaitingScreen;
