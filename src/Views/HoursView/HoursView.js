import React from 'react';
import styled from 'styled-components';
import Month from '../../components/organisms/Month/Month';
import Menu from '../../components/organisms/Menu/Menu';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 30px;
  background-color: ${({ theme }) => theme.primary};
  min-height: 100vh;
  max-width: 100vw;
  max-width: 100vw;
`;

const HoursView = () => (
  <StyledWrapper>
    <Menu />
    <Month></Month>
  </StyledWrapper>
);

export default HoursView;
