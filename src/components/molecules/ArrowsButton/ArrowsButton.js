import React from 'react';
import styled from 'styled-components';
import UpDownButton from '../../atoms/UpDownButton/UpDownButton';
import { connect } from 'react-redux';
import { increaseHours as increaseHoursAction } from '../../../actions/index';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArrowsButton = ({ dayId, increaseHours }) => (
  <StyledWrapper>
    <UpDownButton upButton onClick={() => increaseHours(dayId)} />
    <UpDownButton downButton />
  </StyledWrapper>
);
const mapDispatchToProps = dispatch => ({
  increaseHours: dayId => dispatch(increaseHoursAction(dayId)),
});

export default connect(null, mapDispatchToProps)(ArrowsButton);

/*const mapDispatchToProps = dispatch => ({
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(Card);*/
