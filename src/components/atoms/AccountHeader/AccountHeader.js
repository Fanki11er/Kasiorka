import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledHeader = styled.div`
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme, forSection }) =>
    forSection ? theme.fontSize.verySmall : theme.fontSize.normal};
  font-weight: bold;
  margin: 5px;
  text-align: center;

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme, forSection }) =>
      forSection ? theme.fontSizeMedium.medium : theme.fontSizeMedium.smaller};
  }
`;

const AccountHeader = ({ forSection, label }) => {
  return <StyledHeader forSection={forSection}>{label}</StyledHeader>;
};

AccountHeader.propTypes = {
  forSection: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default AccountHeader;
