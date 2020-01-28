import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Pencil } from 'styled-icons/typicons/';
import withSummaryContext from '../../../hoc/withSummaryContext';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 30px;
  margin-bottom: 15px;
  width: 100%;
  height: ${({ theme }) => theme.rowHeight};
  border: 2px solid ${({ theme }) => theme.menuBlue};
  border-radius: 10px;
  position: relative;
  @media screen and (max-width: 1920px) {
    height: ${({ theme }) => theme.daysHeightMediumScreen};
    padding: 0 15px;
  }

  @media screen and (max-width: 770px) {
    padding: 0 10px;
    width: 98%;
    max-width: 350px;
  }
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  font-weight: bold;
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
  @media screen and (max-width: 767px) {
  }
`;

const StyledSpan = styled.div`
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.smaller};
  font-weight: bold;
  margin: 0 20px;
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.smaller};
    margin: 0 15px;
  }
  @media screen and (max-width: 767px) {
    margin: 5px;
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;

const StyledIconPencil = styled(Pencil)`
  position: absolute;
  right: 20px;
  top: 0;
  width: 40px;
  height: 90%;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.green};

  &:hover,
  :focus {
    color: ${({ theme }) => theme.hover};
    width: 50px;
    height: 100%;
    cursor: pointer;
    @media screen and (max-width: 1920px) {
      width: 35px;
    }
  }
  @media screen and (max-width: 1920px) {
    width: 25px;
  }

  @media screen and (max-width: 767px) {
    right: 5px;
  }
`;

const StyledUnits = styled.div`
  font-size: ${({ theme }) => theme.fontSize.smaller};
  font-weight: bold;
  color: ${({ theme }) => theme.green};
  margin-right: 15px;
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.smaller};
    margin-right: 10px;
  }

  @media screen and (max-width: 767px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.small};
  }
`;
const infoDiv = ({ labelText, labelData, editable, units, summaryContext, chosenOption }) => {
  const { toggleEditSummaryModal: modalToggle } = summaryContext;
  return (
    <StyledWrapper>
      <StyledLabel>{labelText}:</StyledLabel>
      <StyledSpan>{labelData}</StyledSpan>
      <StyledUnits>{units}</StyledUnits>
      {editable && (
        <StyledIconPencil title={`Edytuj ${labelText}`} onClick={() => modalToggle(chosenOption)} />
      )}
    </StyledWrapper>
  );
};

infoDiv.propTypes = {
  labelText: PropTypes.string.isRequired,
  labelData: PropTypes.number.isRequired,
  editable: PropTypes.bool,
  units: PropTypes.string.isRequired,
  summaryContext: PropTypes.object.isRequired,
  chosenOption: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default withSummaryContext(infoDiv);
