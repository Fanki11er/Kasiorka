import styled from 'styled-components';
import { CreditCard } from 'styled-icons/material/';

const CardIcon = styled(CreditCard)`
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

export default CardIcon;
