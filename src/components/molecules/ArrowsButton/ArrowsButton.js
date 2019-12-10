import React from 'react';
import styled from 'styled-components';
import UpDownButton from '../../atoms/UpDownButton/UpDownButton';
import { connect } from 'react-redux';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArrowsButton = ({ dayId, nameOfDay, hours, holiday, increaseHours, onClickAction }) => (
  <StyledWrapper>
    <UpDownButton upButton onClick={onClickAction} />
    <UpDownButton downButton />
  </StyledWrapper>
);
/*const mapDispatchToProps = dispatch => ({
  increaseHours: (dayId, nameOfDay, hours, holiday) =>
    dispatch(increaseHoursAction(dayId, nameOfDay, hours, holiday)),
});*/

//export default connect(null, mapDispatchToProps)(ArrowsButton);
//onClick={() => increaseHours(dayId, nameOfDay, hours, holiday)}
export default ArrowsButton;

/*const mapDispatchToProps = dispatch => ({
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(Card);*/
