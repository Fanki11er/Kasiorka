import React, { Component } from 'react';
import styled from 'styled-components';
import EditSalaryModal from '../../molecules/EditSalaryModal/EditSalaryModal';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0);
  display: none;
  justify-content: center;
  align-items: center;
`;

class EditSummaryOptions extends Component {
  render() {
    return (
      <StyledWrapper>
        <EditSalaryModal />
      </StyledWrapper>
    );
  }
}

export default EditSummaryOptions;
