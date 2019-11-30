import React from 'react';
import styled from 'styled-components';
import Month from '../../components/organisms/Month/Month';
import Menu from '../../components/organisms/Menu/Menu';

const StyledWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  padding: 30px;
  background-color: ${({ theme }) => theme.primary};
`;

const HoursView = () => (
  <StyledWrapper>
    <Menu />
    <Month></Month>
  </StyledWrapper>
);

export default HoursView;
