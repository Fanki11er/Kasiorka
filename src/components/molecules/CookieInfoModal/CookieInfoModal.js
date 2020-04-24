import React from 'react';
import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 40px;
  justify-self: center;
  padding: 20px;
  border: 2px solid ${({ theme }) => theme.hover};
  background-color: ${({ theme }) => theme.primary};
  border-radius: 10px;
  width: 60%;
  min-height: 150px;
  justify-content: space-around;
  align-items: center;
`;

const StyledFlexWrapper = styled.div`
  display: flex;
  width: 100%;
  align-content: space-around;
`;

const StyledCookieText = styled.div`
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.smallest};
  text-align: center;
  line-height: 30px;
  margin-bottom: 10px;
`;

const CookieInfoModal = ({ hideInfo }) => {
  return (
    <StyledWrapper>
      <StyledFlexWrapper>
        <StyledCookieText>
          Ta strona korzysta z ciasteczek aby świadczyć usługi na najwyższym poziomie. Dalsze
          korzystanie ze strony oznacza, że zgadzasz się na ich użycie.
        </StyledCookieText>
      </StyledFlexWrapper>
      <MenuItem onClick={hideInfo}>Rozumiem</MenuItem>
    </StyledWrapper>
  );
};

CookieInfoModal.propTypes = {
  hideInfo: PropTypes.func.isRequired,
};
export default CookieInfoModal;
