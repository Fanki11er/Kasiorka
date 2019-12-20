import React, { Component } from 'react';
import styled from 'styled-components';
import InfoDiv from '../../atoms/InfoDiv/InfoDiv';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  width: 550px;
  margin: 0 auto;
`;

class Summary extends Component {
  render() {
    return (
      <StyledWrapper>
        <InfoDiv labelText="Suma godzin" labelData={200} units={'h'}></InfoDiv>
        <InfoDiv editable labelText="Stawka godzinowa" labelData={20} units={'zł/h'}></InfoDiv>
        <InfoDiv labelText="Przewidywana wypłata" labelData={3000.55} units={'zł'}></InfoDiv>
        <InfoDiv editable labelText="Otrzymana wypłata" labelData={3000} units={'zł'}></InfoDiv>
      </StyledWrapper>
    );
  }
}
export default Summary;
