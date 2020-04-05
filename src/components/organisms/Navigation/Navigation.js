import React from 'react';
import styled from 'styled-components';
import ViewMenu from '../../molecules/ViewMenu/ViewMenu';
import UserMenu from '../../molecules/UserMenu/UserMenu';
import ModalExtraInfo from '../../atoms/MobileExtraInfo/MobileExtraInfo';
import withMenuContext from '../../../hoc/withMenuContext';

const StyledWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  padding: 0 70px;
  background-color: ${({ theme }) => theme.primary};

  @media screen and (max-width: 1920px) {
    height: 50px;
    padding: 0 30px;
    width: 90%;
  }
  @media screen and (max-width: 769px) {
    flex-flow: column-reverse;
    height: 150px;
  }
`;

const Navigation = ({ menuContext: { selectedMonthId } }) => {
  return (
    <StyledWrapper>
      <ModalExtraInfo selectedMonthId={selectedMonthId} />
      <ViewMenu />
      <UserMenu />
    </StyledWrapper>
  );
};

export default withMenuContext(Navigation);
