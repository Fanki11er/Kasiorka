import React from 'react';
import styled from 'styled-components';
import Month from '../../components/organisms/Month/Month';

const StyledWrapper = styled.div`
  display: flex;
`;

const HoursView = () => (
  <StyledWrapper>
    <Month></Month>
  </StyledWrapper>
);

export default HoursView;
