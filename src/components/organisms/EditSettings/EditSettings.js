import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CoverDiv from '../../atoms/CoverDiv/CoverDiv';
import EditSettingsModal from '../../molecules/EditSettingsModal/EditSettingsModal';

const StyledCoverDiv = styled(CoverDiv)`
  justify-content: left;
  transform: ${({ isModalOpened }) =>
    isModalOpened === true ? 'translateX(0)' : 'translateX(-110%)'};
  transition: transform 0.8s ease-out;
`;

class EditSettings extends Component {
  render() {
    const { isSettingsModalOpened } = this.props;
    return (
      <StyledCoverDiv isModalOpened={isSettingsModalOpened}>
        <EditSettingsModal />
      </StyledCoverDiv>
    );
  }
}
EditSettings.propTypes = {
  isSettingsModalOpened: PropTypes.bool.isRequired,
};
export default EditSettings;
