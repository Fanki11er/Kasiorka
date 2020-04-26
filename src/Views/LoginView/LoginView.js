import React, { useEffect } from 'react';
import styled from 'styled-components';
import { initGA, pageView } from '../../tools/reactGaSetup';
import LoginImage from '../../components/atoms/LoginImage/LoginImage';
import TitleHeader from '../../components/atoms/TitleHeader/TitleHeader';
import LoginForm from '../../components/molecules/LoginForm/LoginForm';
import Footer from '../../components/atoms/Footer/Footer';
import BackButton from '../../components/atoms/BackButton/BackButton';

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.primary};
  width: 100%;
  min-height: 100vh;
`;

const StyledFlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: 770px) {
    flex-direction: column;
    width: 100%;
  }
`;

const LoginView = () => {
  useEffect(() => {
    initGA();
    pageView();
  }, []);
  return (
    <StyledWrapper>
      <BackButton />
      <TitleHeader />
      <StyledFlexWrapper>
        <LoginImage></LoginImage>
        <LoginForm />
      </StyledFlexWrapper>
      <Footer />
    </StyledWrapper>
  );
};
export default LoginView;
