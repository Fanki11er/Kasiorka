import styled from 'styled-components';

const ExpensesWrapper = styled.div`
  display: flex;
  width: 88%;
  height: ${({ theme }) => theme.rowHeight};
  border: 2px solid ${({ theme }) => theme.menuBlue};
  border-radius: 10px;
  align-items: center;
  padding: 0 10px;
  opacity: 1;
  transition: opacity 0.5s;

  @media screen and (max-width: 1920px) {
    height: ${({ theme }) => theme.rowHeightMediumScreen};
  }

  &.hidden {
    opacity: 0.3;
    user-select: none;
    cursor: auto;
  }
`;

export default ExpensesWrapper;
