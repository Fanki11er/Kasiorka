import React, { Component } from 'react';
import styled from 'styled-components';
import InfoDiv from '../../atoms/InfoDiv/InfoDiv';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  width: 35%;
  margin: 0 auto;
`;

class Summary extends Component {
  render() {
    return (
      <StyledWrapper>
        <InfoDiv divWidth="325px" labelText="Suma godzin" labelData={`${200} h`}></InfoDiv>
        <InfoDiv input divWidth="400px" labelText="Stawka godzinowa" labelData={15}></InfoDiv>
        <InfoDiv
          divWidth="460px"
          labelText="Przewidywana wypłata"
          labelData={`${3000} zł`}
        ></InfoDiv>
        <InfoDiv divWidth="460px" labelText="Otrzymana wypłata" labelData={`${3000} zł`}></InfoDiv>
      </StyledWrapper>
    );
  }
}
export default Summary;
