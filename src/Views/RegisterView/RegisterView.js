import React from 'react';
import styled from 'styled-components';
import RegisterForm from '../../components/molecules/RegisterForm/RegisterForm';
import TitleHeader from '../../components/atoms/TitleHeader/TitleHeader';
import Footer from '../../components/atoms/Footer/Footer';
import BackButton from '../../components/atoms/BackButton/BackButton';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.primary};
  width: 100%;
  min-height: 100vh;
  height: auto;
  padding-top: 65px;
  @media screen and (max-width: 770px) {
    padding-top: 15px;
  }
`;

const StyledTitleWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  width: 400px;
  height: 400px;
  @media screen and (max-width: 1920px) {
    top: 30px;
    left: 30px;
  }
  @media screen and (max-width: 770px) {
    position: inherit;
    margin: 0 auto;
    height: 100px;
    justify-content: center;
    width: 100%;
    margin: 0;
  }
`;

const RegisterView = () => (
  <StyledWrapper>
    <BackButton />
    <StyledTitleWrapper>
      <TitleHeader small />
    </StyledTitleWrapper>
    <RegisterForm />
    <Footer />
  </StyledWrapper>
);

export default RegisterView;
